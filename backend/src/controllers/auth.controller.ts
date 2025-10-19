import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import prisma from '../config/database';
import { config } from '../config';
import { AuthRequest } from '../middleware/auth';
import logger from '../utils/logger';

export class AuthController {
  // Register new user
  static async register(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, firstName, lastName, phoneNumber, role } = req.body;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phoneNumber,
          role: role || 'CUSTOMER',
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          createdAt: true,
        },
      });

      // Create driver profile if role is DRIVER
      if (user.role === 'DRIVER') {
        await prisma.driverProfile.create({
          data: {
            userId: user.id,
          },
        });
      }

      // Generate tokens
      const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        config.jwt.accessSecret,
        { expiresIn: '15m' }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        config.jwt.refreshSecret,
        { expiresIn: '7d' }
      );

      // Save refresh token
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt,
        },
      });

      logger.info(`User registered: ${user.email}`);

      res.status(201).json({
        message: 'Registration successful',
        user,
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  // Login
  static async login(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          driverProfile: true,
        },
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check status
      if (user.status !== 'ACTIVE') {
        return res.status(403).json({ error: 'Account is not active' });
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      // Generate tokens
      const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        config.jwt.accessSecret,
        { expiresIn: '15m' }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        config.jwt.refreshSecret,
        { expiresIn: '7d' }
      );

      // Save refresh token
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt,
        },
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      logger.info(`User logged in: ${user.email}`);

      res.json({
        message: 'Login successful',
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }

  // Refresh token
  static async refreshToken(req: AuthRequest, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token required' });
      }

      // Verify refresh token
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as any;

      // Check if token exists in database
      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        return res.status(401).json({ error: 'Invalid or expired refresh token' });
      }

      // Generate new access token
      const newAccessToken = jwt.sign(
        { id: storedToken.user.id, email: storedToken.user.email, role: storedToken.user.role },
        config.jwt.accessSecret,
        { expiresIn: '15m' }
      );

      res.json({
        accessToken: newAccessToken,
      });
    } catch (error: any) {
      logger.error('Token refresh error:', error);
      res.status(401).json({ error: 'Token refresh failed' });
    }
  }

  // Logout
  static async logout(req: AuthRequest, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (refreshToken) {
        await prisma.refreshToken.delete({
          where: { token: refreshToken },
        }).catch(() => {});
      }

      res.json({ message: 'Logout successful' });
    } catch (error: any) {
      logger.error('Logout error:', error);
      res.status(500).json({ error: 'Logout failed' });
    }
  }

  // Get current user profile
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          role: true,
          status: true,
          avatar: true,
          address: true,
          emailVerified: true,
          phoneVerified: true,
          createdAt: true,
          driverProfile: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error: any) {
      logger.error('Get profile error:', error);
      res.status(500).json({ error: 'Failed to get profile' });
    }
  }
}
