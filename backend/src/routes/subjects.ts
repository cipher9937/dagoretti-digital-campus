import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { gradeLevel } = req.query;
    const where: any = {};
    if (gradeLevel) {
      where.gradeLevel = { has: gradeLevel as string };
    }

    const subjects = await prisma.subject.findMany({
      where,
      include: {
        department: { select: { name: true } },
        _count: { select: { assignments: true, resources: true } },
      },
      orderBy: { name: 'asc' },
    });

    res.json({ success: true, data: subjects });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const subject = await prisma.subject.findUnique({
      where: { id },
      include: {
        department: true,
        assignments: {
          where: { status: 'ACTIVE' },
          orderBy: { dueDate: 'asc' },
          take: 10,
        },
        resources: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        discussionBoards: true,
      },
    });

    if (!subject) {
      throw new AppError('Subject not found', 404);
    }

    res.json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
});

export { router as subjectRouter };
