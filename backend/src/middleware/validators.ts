import { body, param, query, ValidationChain } from 'express-validator';

export const validators = {
  // Auth validators
  register: [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').trim().notEmpty().withMessage('First name required'),
    body('lastName').trim().notEmpty().withMessage('Last name required'),
    body('phoneNumber').optional().isMobilePhone('any'),
  ],

  login: [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],

  // Order validators
  createOrder: [
    body('pickupAddress').trim().notEmpty().withMessage('Pickup address required'),
    body('deliveryAddress').trim().notEmpty().withMessage('Delivery address required'),
    body('deliveryType').isIn([
      'FOOD_DELIVERY',
      'PARCEL_DELIVERY',
      'GROCERY_ERRANDS',
      'PHARMACEUTICAL',
      'BUS_STATION_PICKUP',
      'ONLINE_SHOPS',
      'PERSONAL_ERRANDS',
      'OTHER',
    ]),
    body('packageSize').optional().isIn(['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE']),
    body('recipientPhone').optional().isMobilePhone('any'),
  ],

  assignOrder: [
    param('id').isUUID().withMessage('Invalid order ID'),
    body('driverId').isUUID().withMessage('Invalid driver ID'),
  ],

  updateOrderStatus: [
    param('id').isUUID().withMessage('Invalid order ID'),
    body('status').isIn([
      'PENDING',
      'CONFIRMED',
      'ASSIGNED',
      'PICKED_UP',
      'IN_TRANSIT',
      'DELIVERED',
      'FAILED',
      'CANCELLED',
    ]),
  ],

  // User validators
  updateProfile: [
    body('firstName').optional().trim().notEmpty(),
    body('lastName').optional().trim().notEmpty(),
    body('phoneNumber').optional().isMobilePhone('any'),
    body('address').optional().trim(),
  ],

  // Driver validators
  updateLocation: [
    body('lat').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
    body('lng').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
  ],
};
