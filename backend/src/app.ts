import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';
import { studentRouter } from './routes/students';
import { teacherRouter } from './routes/teachers';
import { classRouter } from './routes/classes';
import { subjectRouter } from './routes/subjects';
import { assignmentRouter } from './routes/assignments';
import { resourceRouter } from './routes/resources';
import { libraryRouter } from './routes/library';
import { newsRouter } from './routes/news';
import { eventRouter } from './routes/events';
import { announcementRouter } from './routes/announcements';
import { attendanceRouter } from './routes/attendance';
import { onlineClassRouter } from './routes/onlineClasses';
import { timetableRouter } from './routes/timetables';
import { discussionRouter } from './routes/discussions';
import { notificationRouter } from './routes/notifications';
import { galleryRouter } from './routes/gallery';
import { dashboardRouter } from './routes/dashboard';
import { settingsRouter } from './routes/settings';

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://*"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(hpp());
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Dagoretti High School Digital Campus API' });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/students', studentRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/classes', classRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/assignments', assignmentRouter);
app.use('/api/resources', resourceRouter);
app.use('/api/library', libraryRouter);
app.use('/api/news', newsRouter);
app.use('/api/events', eventRouter);
app.use('/api/announcements', announcementRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/online-classes', onlineClassRouter);
app.use('/api/timetables', timetableRouter);
app.use('/api/discussions', discussionRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/settings', settingsRouter);

// Static files
app.use('/uploads', express.static('uploads'));

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

export default app;
