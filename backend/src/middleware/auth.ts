import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

// User role constants
const USER_ROLES = {
  ADMIN: 'ADMIN',
  DISPATCH_MANAGER: 'DISPATCH_MANAGER',
  DRIVER: 'DRIVER',
  CUSTOMER: 'CUSTOMER',
  FINANCE: 'FINANCE'
} as const;

type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    email: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers?.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.substring(7);
    
    const decoded = jwt.verify(token, config.jwt.accessSecret) as any;
    
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};
