import request from 'supertest';
import app from '../src/app';

describe('News API', () => {
  describe('GET /api/news', () => {
    it('should list published news', async () => {
      const res = await request(app).get('/api/news');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should filter by category', async () => {
      const res = await request(app).get('/api/news?category=Sports');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('GET /api/news/:slug', () => {
    it('should get news article by slug', async () => {
      const res = await request(app).get('/api/news/dagoretti-top-500-kcse-2024');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
