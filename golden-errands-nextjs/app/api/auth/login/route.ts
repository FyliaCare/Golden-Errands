// POST /api/auth/login - User login
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { successResponse, errorResponse, validationErrorResponse, serverErrorResponse } from '@/lib/api-response';
import { loginSchema, validateRequest } from '@/lib/validators';
import { ZodError } from 'zod';

// Force Node.js runtime (bcryptjs doesn't work in Edge runtime)
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = await validateRequest(loginSchema, body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        driverProfile: true,
      },
    });

    if (!user) {
      return errorResponse('Invalid credentials', null, 401);
    }

    // Check account status
    if (user.status !== 'ACTIVE') {
      return errorResponse('Account is not active', null, 403);
    }

    // Verify password
    const validPassword = await verifyPassword(validatedData.password, user.password);
    if (!validPassword) {
      return errorResponse('Invalid credentials', null, 401);
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generate tokens
    const accessToken = await generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role as any,
    });

    const refreshToken = await generateRefreshToken(user.id);

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

    return successResponse(
      {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      },
      'Login successful'
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return validationErrorResponse(error.errors);
    }

    console.error('Login error:', error);
    return serverErrorResponse('Login failed');
  }
}
