import { Router } from 'express';
import { body, param } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { page = '1', limit = '20', type, subjectId, gradeLevel, search } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (type) where.type = type;
    if (subjectId) where.subjectId = subjectId as string;
    if (gradeLevel) {
      where.subject = { gradeLevel: { has: gradeLevel as string } };
    }
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [resources, total] = await Promise.all([
      prisma.resource.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          subject: { select: { name: true, code: true } },
        },
      }),
      prisma.resource.count({ where }),
    ]);

    res.json({
      success: true,
      data: resources,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await prisma.resource.findUnique({
      where: { id },
      include: {
        subject: true,
      },
    });

    if (!resource) {
      throw new AppError('Resource not found', 404);
    }

    await prisma.resource.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    res.json({ success: true, data: resource });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'),
  validate([
    body('title').trim().notEmpty(),
    body('type').isIn(['NOTE', 'VIDEO', 'PRESENTATION', 'WORKSHEET', 'PAST_PAPER', 'TEXTBOOK', 'RESEARCH', 'LINK']),
    body('subjectId').optional().isUUID(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
      const resource = await prisma.resource.create({
        data: {
          ...req.body,
          teacherId: teacher?.id || req.body.teacherId,
        },
        include: { subject: { select: { name: true } } },
      });

      res.status(201).json({ success: true, data: resource });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:id/download', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.resource.update({
      where: { id },
      data: { downloadCount: { increment: 1 } },
    });
    res.json({ success: true, message: 'Download counted' });
  } catch (error) {
    next(error);
  }
});

export { router as resourceRouter };
