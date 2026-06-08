import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { subjectId, classId, status, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};

    if (req.user!.role === 'TEACHER') {
      const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
      if (teacher) where.teacherId = teacher.id;
    }
    if (req.user!.role === 'STUDENT') {
      const student = await prisma.student.findUnique({ where: { userId: req.user!.id } });
      if (student) where.classId = student.classId;
      where.status = 'PUBLISHED';
    }
    if (subjectId) where.subjectId = subjectId;
    if (classId) where.classId = classId;
    if (status) where.status = status;

    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
        where, skip, take: Number(limit), orderBy: { dueDate: 'asc' },
        include: {
          subject: { select: { name: true, code: true } },
          teacher: { select: { firstName: true, lastName: true } },
          _count: { select: { submissions: true } }
        }
      }),
      prisma.assignment.count({ where })
    ]);

    res.json({ success: true, data: assignments, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } });
  } catch (error) { next(error); }
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: req.params.id },
      include: {
        subject: true,
        teacher: { select: { firstName: true, lastName: true } },
        submissions: req.user!.role !== 'STUDENT' ? {
          include: { student: { select: { firstName: true, lastName: true, admissionNumber: true } } }
        } : false
      }
    });
    if (!assignment) throw new AppError('Assignment not found', 404);
    res.json({ success: true, data: assignment });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const teacher = await prisma.teacher.findUnique({ where: { userId: req.user!.id } });
    const assignment = await prisma.assignment.create({
      data: {
        ...req.body,
        teacherId: teacher?.id || req.body.teacherId,
        dueDate: new Date(req.body.dueDate)
      },
      include: { subject: true }
    });
    res.status(201).json({ success: true, data: assignment });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignment = await prisma.assignment.update({
      where: { id: req.params.id },
      data: { ...req.body, ...(req.body.dueDate && { dueDate: new Date(req.body.dueDate) }) }
    });
    res.json({ success: true, data: assignment });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('TEACHER', 'ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.assignment.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Assignment deleted' });
  } catch (error) { next(error); }
});

export default router;