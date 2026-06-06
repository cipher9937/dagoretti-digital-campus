import { Router } from 'express';
import { body, param } from 'express-validator';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';
import { auditLog } from '../middleware/auditLog';

const router = Router();

router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res, next) => {
  try {
    const { page = '1', limit = '20', role, status, search } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (role) where.role = role;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, email: true, firstName: true, lastName: true,
          role: true, status: true, avatar: true, createdAt: true,
          lastLogin: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: users,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;

    if (req.user!.id !== id && !['ADMIN', 'SUPER_ADMIN'].includes(req.user!.role)) {
      throw new AppError('Unauthorized', 403);
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        student: { include: { stream: { include: { class: true } } } },
        teacher: { include: { department: true, subjectAssignments: { include: { subject: true } } } },
        admin: true,
      },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        role: true, status: true, avatar: true, phone: true,
        createdAt: true, updatedAt: true, lastLogin: true,
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

router.patch('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  validate([
    param('id').isUUID(),
    body('firstName').optional().trim().isLength({ min: 2 }),
    body('lastName').optional().trim().isLength({ min: 2 }),
    body('role').optional().isIn(['STUDENT', 'TEACHER', 'ADMIN', 'SUPER_ADMIN']),
    body('status').optional().isIn(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']),
  ]),
  auditLog('UPDATE_USER', 'User'),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, role, status } = req.body;

      const user = await prisma.user.update({
        where: { id },
        data: { firstName, lastName, role, status },
        select: { id: true, email: true, firstName: true, lastName: true, role: true, status: true },
      });

      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), auditLog('DELETE_USER', 'User'),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { id } = req.params;
      await prisma.user.delete({ where: { id } });
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

export { router as userRouter };
