import { Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';
import logger from '../utils/logger';

// Order status constants
const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  ASSIGNED: 'ASSIGNED',
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
} as const;

export class OrderController {
  // Create new order
  static async createOrder(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user!.id;
      const {
        pickupAddress,
        pickupLat,
        pickupLng,
        pickupContact,
        pickupInstructions,
        deliveryAddress,
        deliveryLat,
        deliveryLng,
        deliveryContact,
        deliveryInstructions,
        recipientName,
        recipientPhone,
        deliveryType,
        packageSize,
        packageDescription,
        itemsList,
        packageValue,
        weight,
        scheduledPickupTime,
        scheduledDeliveryTime,
        deliveryTimeWindow,
        paymentMethod,
      } = req.body;

      // Calculate pricing (simplified - would be more complex in production)
      let estimatedDistance = 0;
      if (pickupLat && pickupLng && deliveryLat && deliveryLng) {
        estimatedDistance = calculateDistance(pickupLat, pickupLng, deliveryLat, deliveryLng);
      }

      const basePrice = 10; // Base GHS
      const distancePrice = estimatedDistance * 2; // 2 GHS per km
      const totalPrice = basePrice + distancePrice;

      const order = await prisma.order.create({
        data: {
          customerId: userId,
          pickupAddress,
          pickupLat,
          pickupLng,
          pickupContact,
          pickupInstructions,
          deliveryAddress,
          deliveryLat,
          deliveryLng,
          deliveryContact,
          deliveryInstructions,
          recipientName,
          recipientPhone,
          deliveryType,
          packageSize,
          packageDescription,
          itemsList: itemsList ? JSON.stringify(itemsList) : null,
          packageValue,
          weight,
          scheduledPickupTime,
          scheduledDeliveryTime,
          deliveryTimeWindow,
          paymentMethod,
          basePrice,
          distancePrice,
          totalPrice,
          estimatedDistance,
          status: 'PENDING',
        },
        include: {
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phoneNumber: true,
            },
          },
        },
      });

      // Create tracking history entry
      await prisma.trackingHistory.create({
        data: {
          orderId: order.id,
          status: 'Order Created',
          location: pickupAddress,
          lat: pickupLat,
          lng: pickupLng,
        },
      });

      // Create notification for customer
      await prisma.notification.create({
        data: {
          userId,
          type: 'ORDER_CREATED',
          title: 'Order Created',
          message: `Your order #${order.orderNumber} has been created successfully`,
          data: JSON.stringify({ orderId: order.id }),
        },
      });

      logger.info(`Order created: ${order.orderNumber} by user ${userId}`);

      res.status(201).json(order);
    } catch (error: any) {
      logger.error('Create order error:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  }

  // Get all orders (filtered by role)
  static async getOrders(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const userRole = req.user!.role;
      const { status, page = 1, limit = 20 } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      let where: any = {};

      // Filter based on role
      if (userRole === 'CUSTOMER') {
        where.customerId = userId;
      } else if (userRole === 'DRIVER') {
        where.assignedToId = userId;
      }

      // Filter by status if provided
      if (status) {
        where.status = status;
      }

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where,
          include: {
            customer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
              },
            },
            assignedTo: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
              },
            },
            delivery: true,
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: Number(limit),
        }),
        prisma.order.count({ where }),
      ]);

      res.json({
        orders,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error: any) {
      logger.error('Get orders error:', error);
      res.status(500).json({ error: 'Failed to get orders' });
    }
  }

  // Get single order
  static async getOrder(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const userRole = req.user!.role;

      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phoneNumber: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phoneNumber: true,
              driverProfile: true,
            },
          },
          delivery: true,
          trackingHistory: {
            orderBy: { timestamp: 'desc' },
          },
          payments: true,
        },
      });

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Check permissions
      if (
        userRole === 'CUSTOMER' && order.customerId !== userId ||
        userRole === 'DRIVER' && order.assignedToId !== userId
      ) {
        return res.status(403).json({ error: 'Access denied' });
      }

      res.json(order);
    } catch (error: any) {
      logger.error('Get order error:', error);
      res.status(500).json({ error: 'Failed to get order' });
    }
  }

  // Assign order to driver
  static async assignOrder(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { driverId } = req.body;

      // Check if driver exists and is available
      const driver = await prisma.user.findUnique({
        where: { id: driverId },
        include: { driverProfile: true },
      });

      if (!driver || driver.role !== 'DRIVER') {
        return res.status(400).json({ error: 'Invalid driver' });
      }

      if (!driver.driverProfile?.isAvailable) {
        return res.status(400).json({ error: 'Driver is not available' });
      }

      // Update order
      const order = await prisma.order.update({
        where: { id },
        data: {
          assignedToId: driverId,
          assignedAt: new Date(),
          status: 'ASSIGNED',
        },
        include: {
          customer: true,
          assignedTo: true,
        },
      });

      // Create delivery record
      await prisma.delivery.create({
        data: {
          orderId: order.id,
          driverId,
        },
      });

      // Add tracking history
      await prisma.trackingHistory.create({
        data: {
          orderId: order.id,
          status: 'Assigned to Driver',
          notes: `Assigned to ${driver.firstName} ${driver.lastName}`,
        },
      });

      // Notify driver
      await prisma.notification.create({
        data: {
          userId: driverId,
          type: 'ORDER_ASSIGNED',
          title: 'New Delivery Assigned',
          message: `You have been assigned order #${order.orderNumber}`,
          data: JSON.stringify({ orderId: order.id }),
        },
      });

      // Notify customer
      await prisma.notification.create({
        data: {
          userId: order.customerId,
          type: 'ORDER_ASSIGNED',
          title: 'Driver Assigned',
          message: `Your order #${order.orderNumber} has been assigned to a driver`,
          data: JSON.stringify({ orderId: order.id }),
        },
      });

      logger.info(`Order ${order.orderNumber} assigned to driver ${driverId}`);

      res.json(order);
    } catch (error: any) {
      logger.error('Assign order error:', error);
      res.status(500).json({ error: 'Failed to assign order' });
    }
  }

  // Update order status
  static async updateOrderStatus(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { status, notes } = req.body;
      const userId = req.user!.id;

      const order = await prisma.order.findUnique({
        where: { id },
        include: { delivery: true },
      });

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Update order status
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          status,
          ...(status === 'DELIVERED' && { completedAt: new Date() }),
          ...(status === 'CANCELLED' && { cancelledAt: new Date(), cancellationReason: notes }),
        },
      });

      // Update delivery timestamps
      if (order.delivery) {
        const deliveryUpdates: any = {};
        
        if (status === 'PICKED_UP') deliveryUpdates.pickedUpAt = new Date();
        if (status === 'IN_TRANSIT') deliveryUpdates.startedAt = new Date();
        if (status === 'DELIVERED') deliveryUpdates.deliveredAt = new Date();

        if (Object.keys(deliveryUpdates).length > 0) {
          await prisma.delivery.update({
            where: { id: order.delivery.id },
            data: deliveryUpdates,
          });
        }
      }

      // Add tracking history
      await prisma.trackingHistory.create({
        data: {
          orderId: order.id,
          status,
          notes,
        },
      });

      // Send notification
      await prisma.notification.create({
        data: {
          userId: order.customerId,
          type: getNotificationTypeForStatus(status),
          title: `Order ${status}`,
          message: `Your order #${order.orderNumber} is now ${status.toLowerCase()}`,
          data: JSON.stringify({ orderId: order.id }),
        },
      });

      logger.info(`Order ${order.orderNumber} status updated to ${status}`);

      res.json(updatedOrder);
    } catch (error: any) {
      logger.error('Update order status error:', error);
      res.status(500).json({ error: 'Failed to update order status' });
    }
  }
}

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

function getNotificationTypeForStatus(status: string): any {
  const map: any = {
    PICKED_UP: 'ORDER_PICKED_UP',
    IN_TRANSIT: 'ORDER_PICKED_UP',
    DELIVERED: 'ORDER_DELIVERED',
  };
  return map[status] || 'SYSTEM_ALERT';
}
