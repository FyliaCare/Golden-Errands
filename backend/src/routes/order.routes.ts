import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validators } from '../middleware/validators';

const router = Router();

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private (Customer, Admin)
 */
router.post(
  '/',
  authenticate,
  validators.createOrder,
  OrderController.createOrder
);

/**
 * @route   GET /api/orders
 * @desc    Get all orders (filtered by role)
 * @access  Private
 */
router.get('/', authenticate, OrderController.getOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get single order
 * @access  Private
 */
router.get('/:id', authenticate, OrderController.getOrder);

/**
 * @route   PUT /api/orders/:id/assign
 * @desc    Assign order to driver
 * @access  Private (Admin, Dispatch Manager)
 */
router.put(
  '/:id/assign',
  authenticate,
  authorize('ADMIN', 'DISPATCH_MANAGER'),
  validators.assignOrder,
  OrderController.assignOrder
);

/**
 * @route   PUT /api/orders/:id/status
 * @desc    Update order status
 * @access  Private
 */
router.put(
  '/:id/status',
  authenticate,
  validators.updateOrderStatus,
  OrderController.updateOrderStatus
);

export default router;
