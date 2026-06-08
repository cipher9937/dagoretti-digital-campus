import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { curriculum, departmentId, classId } = req.query;
    const where: any = { isActive: true };
    if (curriculum) where.curriculum = curriculum;
    if (departmentId) where.departmentId = departmentId;
    if (classId) where.classSubjects = { some: { classId } };

    const subjects = await prisma.subject.findMany({
      where,
      include: {
        department: { select: { name: true } },
        subjectTeachers: { include: { teacher: { select: { firstName: true, lastName: true } } } },
        _count: { select: { resources: true, assignments: true } }
      },
      orderBy: { name: 'asc' }
    });
    res.json({ success: true, data: subjects });
  } catch (error) { next(error); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await prisma.subject.create({ data: req.body });
    res.status(201).json({ success: true, data: subject });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await prisma.subject.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: subject });
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.subject.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Subject deleted' });
  } catch (error) { next(error); }
});

export default router;