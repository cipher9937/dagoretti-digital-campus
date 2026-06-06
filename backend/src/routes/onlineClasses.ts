import { Router } from 'express';
import { body } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { status, subjectId, upcoming, page = '1', limit = '20' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (status) where.status = status;
    if (subjectId) where.subjectId = subjectId as string;
    if (upcoming === 'true') {
      where.scheduledAt = { gte: new Date() };
    }

    if (req.user!.role === 'TEACHER') {
      const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
      if (teacher) where.teacherId = teacher.id;
    }

    const [classes, total] = await Promise.all([
      prisma.onlineClass.findMany({
        where,
        skip,
        take,
        orderBy: { scheduledAt: 'asc' },
        include: {
          subject: { select: { name: true, code: true } },
        },
      }),
      prisma.onlineClass.count({ where }),
    ]);

    res.json({
      success: true,
      data: classes,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'),
  validate([
    body('title').trim().notEmpty(),
    body('subjectId').isUUID(),
    body('meetLink').trim().isURL(),
    body('scheduledAt').isISO8601(),
    body('duration').optional().isInt({ min: 15, max: 300 }),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
      const onlineClass = await prisma.onlineClass.create({
        data: {
          ...req.body,
          teacherId: teacher?.id || req.body.teacherId,
        },
        include: {
          subject: { select: { name: true } },
        },
      });

      res.status(201).json({ success: true, data: onlineClass });
    } catch (error) {
      next(error);
    }
  }
);

export { router as onlineClassRouter };
