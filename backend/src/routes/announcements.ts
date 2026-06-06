import { Router } from 'express';
import { body, param } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { page = '1', limit = '20', type, priority, pinned } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (type) where.type = type;
    if (priority) where.priority = priority;
    if (pinned === 'true') where.isPinned = true;

    if (req.user!.role === 'STUDENT') {
      where.OR = [
        { type: 'SCHOOL_WIDE' },
        { type: 'STUDENT_ONLY' },
      ];
    } else if (req.user!.role === 'TEACHER') {
      where.OR = [
        { type: 'SCHOOL_WIDE' },
        { type: 'TEACHER_ONLY' },
      ];
    }

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where,
        skip,
        take,
        orderBy: [
          { isPinned: 'desc' },
          { publishedAt: 'desc' },
        ],
        include: {
          author: { select: { firstName: true, lastName: true } },
        },
      }),
      prisma.announcement.count({ where }),
    ]);

    res.json({
      success: true,
      data: announcements,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'TEACHER'),
  validate([
    body('title').trim().notEmpty(),
    body('content').trim().notEmpty(),
    body('type').isIn(['SCHOOL_WIDE', 'TEACHER_ONLY', 'STUDENT_ONLY', 'CLASS_SPECIFIC', 'DEPARTMENT']),
    body('priority').isIn(['LOW', 'NORMAL', 'HIGH', 'URGENT']),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const announcement = await prisma.announcement.create({
        data: {
          ...req.body,
          authorId: req.user!.id,
        },
        include: {
          author: { select: { firstName: true, lastName: true } },
        },
      });

      res.status(201).json({ success: true, data: announcement });
    } catch (error) {
      next(error);
    }
  }
);

export { router as announcementRouter };
