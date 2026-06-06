import request from 'supertest';
import app from '../src/app';

describe('Users API', () => {
  let authToken: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@dagorettihigh.ac.ke',
        password: 'Dagoretti@2024',
      });
    authToken = res.body.data.accessToken;
  });

  describe('GET /api/users', () => {
    it('should list users with admin token', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should paginate results', async () => {
      const res = await request(app)
        .get('/api/users?page=1&limit=10')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.pagination).toBeDefined();
      expect(res.body.pagination.limit).toBe(10);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get user details', async () => {
      const usersRes = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);

      const userId = usersRes.body.data[0].id;

      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(userId);
    });
  });
});
