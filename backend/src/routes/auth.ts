import { Router } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma';
import { generateTokens, verifyRefreshToken, verifyAccessToken } from '../utils/jwt';
import { AppError } from '../middleware/errorHandler';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { logger } from '../utils/logger';

const router = Router();

router.post('/register', 
  validate([
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
    body('firstName').trim().isLength({ min: 2 }),
    body('lastName').trim().isLength({ min: 2 }),
    body('role').optional().isIn(['STUDENT', 'TEACHER', 'ADMIN']),
  ]),
  async (req, res, next) => {
    try {
      const { email, password, firstName, lastName, role = 'STUDENT' } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new AppError('Email already registered', 409);
      }

      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS || '12'));

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role,
          status: 'PENDING',
        },
        select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
      });

      logger.info(`New user registered: ${email}`);
      res.status(201).json({ success: true, message: 'Registration successful. Awaiting admin approval.', data: user });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/login',
  validate([
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ]),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
        include: { student: true, teacher: true, admin: true },
      });

      if (!user) {
        throw new AppError('Invalid credentials', 401);
      }

      if (user.status === 'SUSPENDED') {
        throw new AppError('Account suspended. Contact administration.', 403);
      }

      if (user.status === 'INACTIVE') {
        throw new AppError('Account inactive. Contact administration.', 403);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new AppError('Invalid credentials', 401);
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      const tokens = generateTokens({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      await prisma.session.create({
        data: {
          userId: user.id,
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        },
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: process.env.COOKIE_SAME_SITE as 'strict' | 'lax' | 'none' || 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      logger.info(`User logged in: ${email}`);
      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            avatar: user.avatar,
            student: user.student,
            teacher: user.teacher,
          },
          accessToken: tokens.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/refresh', async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      throw new AppError('Refresh token required', 401);
    }

    const decoded = verifyRefreshToken(refreshToken);
    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new AppError('Invalid or expired refresh token', 401);
    }

    const tokens = generateTokens({
      userId: session.user.id,
      email: session.user.email,
      role: session.user.role,
    });

    await prisma.session.update({
      where: { id: session.id },
      data: { token: tokens.accessToken, refreshToken: tokens.refreshToken },
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: process.env.COOKIE_SAME_SITE as 'strict' | 'lax' | 'none' || 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, data: { accessToken: tokens.accessToken } });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      await prisma.session.deleteMany({ where: { token } });
    }

    res.clearCookie('refreshToken');
    logger.info(`User logged out: ${req.user?.email}`);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
});

router.get('/me', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { student: { include: { stream: { include: { class: true } } } }, teacher: { include: { department: true } }, admin: true },
      select: {
        id: true, email: true, firstName: true, lastName: true, role: true,
        avatar: true, status: true, lastLogin: true, createdAt: true,
        student: true, teacher: true, admin: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

router.patch('/change-password', authenticate,
  validate([
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await prisma.user.findUnique({ where: { id: req.user!.id } });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        throw new AppError('Current password is incorrect', 400);
      }

      const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_ROUNDS || '12'));
      await prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword } });

      await prisma.session.deleteMany({ where: { userId: user.id } });
      res.clearCookie('refreshToken');

      res.json({ success: true, message: 'Password changed successfully. Please log in again.' });
    } catch (error) {
      next(error);
    }
  }
);

export { router as authRouter };
