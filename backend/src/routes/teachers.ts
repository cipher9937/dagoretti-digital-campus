import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { staffNumber: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where, skip, take: Number(limit), orderBy: { firstName: 'asc' },
        include: {
          department: true,
          user: { select: { email: true, isActive: true } },
          subjectTeachers: { include: { subject: true } }
        }
      }),
      prisma.teacher.count({ where })
    ]);
    res.json({ success: true, data: teachers, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) } });
  } catch (error) { next(error); }
});

router.get('/profile', authenticate, authorize('TEACHER'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user!.id },
      include: { department: true, user: { select: { email: true } }, subjectTeachers: { include: { subject: true } }, classTeacher: true }
    });
    if (!teacher) throw new AppError('Teacher profile not found', 404);
    res.json({ success: true, data: teacher });
  } catch (error) { next(error); }
});

router.get('/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: req.params.id },
      include: { department: true, user: { select: { email: true } }, subjectTeachers: { include: { subject: true } } }
    });
    if (!teacher) throw new AppError('Teacher not found', 404);
    res.json({ success: true, data: teacher });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, phone, departmentId, bio, qualifications, staffNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password || 'DHS@Teacher2024', 12);
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: { email, password: hashedPassword, role: 'TEACHER' } });
      return tx.teacher.create({
        data: { userId: user.id, firstName, lastName, staffNumber, phone, departmentId, bio, qualifications },
        include: { department: true, user: { select: { email: true } } }
      });
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'TEACHER'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const teacher = await prisma.teacher.update({
      where: { id: req.params.id },
      data: req.body,
      include: { department: true }
    });
    res.json({ success: true, data: teacher });
  } catch (error) { next(error); }
});

router.post('/:id/assign-subject', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subjectId, classId } = req.body;
    const assignment = await prisma.subjectTeacher.create({
      data: { teacherId: req.params.id, subjectId, classId }
    });
    res.status(201).json({ success: true, data: assignment });
  } catch (error) { next(error); }
});

export default router;