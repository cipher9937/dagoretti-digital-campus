import { Router } from 'express';
import { body } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = Router();

router.get('/', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { classId, teacherId, dayOfWeek, term, academicYear } = req.query;

    const where: any = {};
    if (classId) where.classId = classId as string;
    if (teacherId) where.teacherId = teacherId as string;
    if (dayOfWeek !== undefined) where.dayOfWeek = parseInt(dayOfWeek as string);
    if (term) where.term = parseInt(term as string);
    if (academicYear) where.academicYear = parseInt(academicYear as string);

    if (req.user!.role === 'STUDENT') {
      const student = await prisma.student.findUnique({ where: { userId: req.user!.id } });
      if (student?.stream?.classId) {
        where.classId = student.stream.classId;
      }
    } else if (req.user!.role === 'TEACHER') {
      const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
      if (teacher) where.teacherId = teacher.id;
    }

    const timetables = await prisma.timetable.findMany({
      where,
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
      include: {
        class: { select: { name: true } },
        subject: { select: { name: true, code: true } },
      },
    });

    res.json({ success: true, data: timetables });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'),
  validate([
    body('classId').isUUID(),
    body('subjectId').isUUID(),
    body('teacherId').isUUID(),
    body('dayOfWeek').isInt({ min: 0, max: 6 }),
    body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const timetable = await prisma.timetable.create({
        data: req.body,
        include: {
          class: { select: { name: true } },
          subject: { select: { name: true } },
        },
      });

      res.status(201).json({ success: true, data: timetable });
    } catch (error) {
      next(error);
    }
  }
);

export { router as timetableRouter };
