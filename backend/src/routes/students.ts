import { Router } from 'express';
import { body, param } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'TEACHER'), async (req, res, next) => {
  try {
    const { page = '1', limit = '20', gradeLevel, streamId, search } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (gradeLevel) where.gradeLevel = gradeLevel;
    if (streamId) where.streamId = streamId as string;
    if (search) {
      where.OR = [
        { admissionNumber: { contains: search as string, mode: 'insensitive' } },
        { user: { firstName: { contains: search as string, mode: 'insensitive' } } },
        { user: { lastName: { contains: search as string, mode: 'insensitive' } } },
      ];
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, email: true, firstName: true, lastName: true, avatar: true, status: true } },
          stream: { include: { class: true } },
        },
      }),
      prisma.student.count({ where }),
    ]);

    res.json({
      success: true,
      data: students,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true, avatar: true, phone: true, status: true } },
        stream: { include: { class: true } },
        enrollments: { include: { subject: true } },
        attendances: { orderBy: { date: 'desc' }, take: 30 },
      },
    });

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    if (req.user!.role === 'STUDENT' && req.user!.id !== student.userId) {
      throw new AppError('Unauthorized', 403);
    }

    res.json({ success: true, data: student });
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
    body('admissionNumber').trim().notEmpty(),
    body('gender').isIn(['MALE', 'FEMALE', 'OTHER']),
    body('gradeLevel').isIn(['GRADE_10', 'FORM_3', 'FORM_4']),
    body('streamId').optional().isUUID(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { email, password, firstName, lastName, admissionNumber, gender, gradeLevel, streamId, parentName, parentPhone, parentEmail, dateOfBirth } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new AppError('Email already registered', 409);
      }

      const existingAdmission = await prisma.student.findUnique({ where: { admissionNumber } });
      if (existingAdmission) {
        throw new AppError('Admission number already exists', 409);
      }

      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS || '12'));

      const student = await prisma.student.create({
        data: {
          user: {
            create: {
              email,
              password: hashedPassword,
              firstName,
              lastName,
              role: 'STUDENT',
              status: 'ACTIVE',
            },
          },
          admissionNumber,
          gender,
          gradeLevel,
          streamId,
          parentName,
          parentPhone,
          parentEmail,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        },
        include: {
          user: { select: { id: true, email: true, firstName: true, lastName: true, status: true } },
          stream: { include: { class: true } },
        },
      });

      res.status(201).json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  validate([
    param('id').isUUID(),
    body('firstName').optional().trim().isLength({ min: 2 }),
    body('lastName').optional().trim().isLength({ min: 2 }),
    body('status').optional().isIn(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
    body('streamId').optional().isUUID(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, status, streamId, parentName, parentPhone } = req.body;

      const student = await prisma.student.update({
        where: { id },
        data: {
          user: { update: { firstName, lastName, status } },
          streamId,
          parentName,
          parentPhone,
        },
        include: {
          user: { select: { id: true, email: true, firstName: true, lastName: true, status: true } },
          stream: { include: { class: true } },
        },
      });

      res.json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }
);

export { router as studentRouter };
