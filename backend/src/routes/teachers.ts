import { Router } from 'express';
import { body, param } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res, next) => {
  try {
    const { page = '1', limit = '20', departmentId, search } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (departmentId) where.departmentId = departmentId as string;
    if (search) {
      where.OR = [
        { employeeNumber: { contains: search as string, mode: 'insensitive' } },
        { user: { firstName: { contains: search as string, mode: 'insensitive' } } },
        { user: { lastName: { contains: search as string, mode: 'insensitive' } } },
      ];
    }

    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, email: true, firstName: true, lastName: true, avatar: true, status: true } },
          department: true,
          classTeacherStream: { include: { class: true } },
        },
      }),
      prisma.teacher.count({ where }),
    ]);

    res.json({
      success: true,
      data: teachers,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;

    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true, avatar: true, phone: true, status: true } },
        department: true,
        classTeacherStream: { include: { class: true } },
        subjectAssignments: { include: { subject: true } },
      },
    });

    if (!teacher) {
      throw new AppError('Teacher not found', 404);
    }

    if (req.user!.role === 'TEACHER' && req.user!.id !== teacher.userId) {
      throw new AppError('Unauthorized', 403);
    }

    res.json({ success: true, data: teacher });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  validate([
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('firstName').trim().isLength({ min: 2 }),
    body('lastName').trim().isLength({ min: 2 }),
    body('employeeNumber').trim().notEmpty(),
    body('gender').isIn(['MALE', 'FEMALE', 'OTHER']),
    body('departmentId').optional().isUUID(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { email, password, firstName, lastName, employeeNumber, gender, departmentId, specialization, qualification } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new AppError('Email already registered', 409);
      }

      const existingEmployee = await prisma.teacher.findUnique({ where: { employeeNumber } });
      if (existingEmployee) {
        throw new AppError('Employee number already exists', 409);
      }

      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS || '12'));

      const teacher = await prisma.teacher.create({
        data: {
          user: {
            create: {
              email,
              password: hashedPassword,
              firstName,
              lastName,
              role: 'TEACHER',
              status: 'ACTIVE',
            },
          },
          employeeNumber,
          gender,
          departmentId,
          specialization,
          qualification,
        },
        include: {
          user: { select: { id: true, email: true, firstName: true, lastName: true, status: true } },
          department: true,
        },
      });

      res.status(201).json({ success: true, data: teacher });
    } catch (error) {
      next(error);
    }
  }
);

export { router as teacherRouter };
