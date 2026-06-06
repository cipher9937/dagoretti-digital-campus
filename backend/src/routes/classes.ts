import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        streams: {
          include: {
            classTeacher: {
              include: { user: { select: { firstName: true, lastName: true } } },
            },
            _count: { select: { students: true } },
          },
        },
        subjects: { select: { id: true, name: true, code: true } },
      },
      orderBy: { year: 'desc' },
    });

    res.json({ success: true, data: classes });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        streams: {
          include: {
            classTeacher: { include: { user: { select: { firstName: true, lastName: true } } } },
            students: {
              include: { user: { select: { firstName: true, lastName: true, email: true } } },
            },
          },
        },
        subjects: true,
        timetables: {
          include: { subject: { select: { name: true } } },
        },
      },
    });

    if (!classData) {
      throw new AppError('Class not found', 404);
    }

    res.json({ success: true, data: classData });
  } catch (error) {
    next(error);
  }
});

export { router as classRouter };
