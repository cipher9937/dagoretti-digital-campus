import app from './app';
import { prisma } from './utils/prisma';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Dagoretti High School Digital Campus API running on port ${PORT}`);
  logger.info(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    await prisma.$disconnect();
    logger.info('Server closed and database disconnected');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(async () => {
    await prisma.$disconnect();
    logger.info('Server closed and database disconnected');
    process.exit(0);
  });
});
