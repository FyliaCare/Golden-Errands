import { Router } from 'express';
import authRoutes from './auth.routes';
import orderRoutes from './order.routes';
import userRoutes from './user.routes';
import driverRoutes from './driver.routes';
import paymentRoutes from './payment.routes';
import setupRoutes from './setup.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);
router.use('/drivers', driverRoutes);
router.use('/payments', paymentRoutes);
router.use('/setup', setupRoutes);

export default router;
