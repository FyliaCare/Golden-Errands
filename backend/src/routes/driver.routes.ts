import { Router } from 'express';
import prisma from '../config/database';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { Response } from 'express';
import { validators } from '../middleware/validators';
import { validationResult } from 'express-validator';
import logger from '../utils/logger';

const router = Router();

/**
 * @route   GET /api/drivers
 * @desc    Get all drivers
 * @access  Private (Admin, Dispatch Manager)
 */
router.get('/', authenticate, authorize('ADMIN', 'DISPATCH_MANAGER'), async (req: AuthRequest, res: Response) => {
  try {
    const { isAvailable } = req.query;

    const where: any = { role: 'DRIVER' };
    const driverProfileWhere: any = {};
    
    if (isAvailable !== undefined) {
      driverProfileWhere.isAvailable = isAvailable === 'true';
    }

    const drivers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        status: true,
        driverProfile: {
          where: driverProfileWhere,
        },
      },
    });

    res.json(drivers.filter(d => d.driverProfile));
  } catch (error) {
    logger.error('Get drivers error:', error);
    res.status(500).json({ error: 'Failed to get drivers' });
  }
});

/**
 * @route   POST /api/drivers/:id/location
 * @desc    Update driver location
 * @access  Private (Driver)
 */
router.post('/:id/location', authenticate, authorize('DRIVER'), validators.updateLocation, async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { lat, lng } = req.body;

    // Verify driver owns this profile
    if (req.user!.id !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const driverProfile = await prisma.driverProfile.update({
      where: { userId: id },
      data: {
        currentLat: lat,
        currentLng: lng,
        lastLocationUpdate: new Date(),
      },
    });

    res.json({
      message: 'Location updated',
      location: {
        lat: driverProfile.currentLat,
        lng: driverProfile.currentLng,
        updatedAt: driverProfile.lastLocationUpdate,
      },
    });
  } catch (error) {
    logger.error('Update driver location error:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

/**
 * @route   PUT /api/drivers/:id/availability
 * @desc    Update driver availability
 * @access  Private (Driver)
 */
router.put('/:id/availability', authenticate, authorize('DRIVER'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    if (req.user!.id !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const driverProfile = await prisma.driverProfile.update({
      where: { userId: id },
      data: { isAvailable },
    });

    logger.info(`Driver ${id} availability set to ${isAvailable}`);

    res.json({
      message: 'Availability updated',
      isAvailable: driverProfile.isAvailable,
    });
  } catch (error) {
    logger.error('Update driver availability error:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

export default router;
