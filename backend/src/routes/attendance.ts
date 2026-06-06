import { Router } from 'express';
import { body } from 'express-validator';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'TEACHER'), async (req, res, next) => {
  try {
    const { date, streamId, studentId, page = '1', limit = '50' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = {};
    if (date) where.date = new Date(date as string);
    if (streamId) where.student = { streamId: streamId as string };
    if (studentId) where.studentId = studentId as string;

    const [attendance, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        skip,
        take,
        orderBy: { date: 'desc' },
        include: {
          student: {
            include: {
              user: { select: { firstName: true, lastName: true } },
              stream: { include: { class: true } },
            },
          },
        },
      }),
      prisma.attendance.count({ where }),
    ]);

    res.json({
      success: true,
      data: attendance,
      pagination: { page: parseInt(page as string), limit: take, total, pages: Math.ceil(total / take) },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/mark', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'),
  validate([
    body('records').isArray(),
    body('records.*.studentId').isUUID(),
    body('records.*.status').isIn(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED', 'SICK']),
    body('date').isISO8601(),
  ]),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { records, date } = req.body;
      const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
      const markedBy = teacher?.id || req.user!.id;

      const created = await prisma.$transaction(
        records.map((record: any) =>
          prisma.attendance.upsert({
            where: {
              studentId_date_subjectId: {
                studentId: record.studentId,
                date: new Date(date),
                subjectId: record.subjectId || null,
              },
            },
            update: {
              status: record.status,
              notes: record.notes,
              markedBy,
            },
            create: {
              studentId: record.studentId,
              date: new Date(date),
              status: record.status,
              subjectId: record.subjectId,
              notes: record.notes,
              markedBy,
            },
          })
        )
      );

      res.json({ success: true, data: created });
    } catch (error) {
      next(error);
    }
  }
);

export { router as attendanceRouter };
