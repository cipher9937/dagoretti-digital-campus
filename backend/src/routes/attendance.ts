import { Router, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { classId, date, studentId } = req.query;
    const where: any = {};
    if (classId) where.classId = classId;
    if (studentId) where.studentId = studentId;
    if (date) {
      const d = new Date(date as string);
      where.date = {
        gte: new Date(d.setHours(0, 0, 0, 0)),
        lt: new Date(d.setHours(23, 59, 59, 999))
      };
    }
    const records = await prisma.attendance.findMany({
      where,
      include: { student: { select: { firstName: true, lastName: true, admissionNumber: true } } },
      orderBy: { date: 'desc' }
    });
    res.json({ success: true, data: records });
  } catch (error) { next(error); }
});

router.post('/bulk', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
    const { records, classId, date } = req.body;
    const created = await prisma.$transaction(
      records.map((r: any) =>
        prisma.attendance.upsert({
          where: { studentId_classId_date: { studentId: r.studentId, classId, date: new Date(date) } },
          create: { studentId: r.studentId, classId, date: new Date(date), status: r.status, teacherId: teacher?.id || req.body.teacherId },
          update: { status: r.status }
        })
      )
    );
    res.status(201).json({ success: true, data: created });
  } catch (error) { next(error); }
});

router.get('/report/:classId', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate } = req.query;
    const where: any = { classId: req.params.classId };
    if (startDate && endDate) {
      where.date = { gte: new Date(startDate as string), lte: new Date(endDate as string) };
    }
    const records = await prisma.attendance.groupBy({
      by: ['studentId', 'status'],
      where,
      _count: { status: true }
    });
    res.json({ success: true, data: records });
  } catch (error) { next(error); }
});

export default router;