import request from 'supertest';
import app from '../src/app';

describe('Assignments API', () => {
  let authToken: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'j.mwangi@dagorettihigh.ac.ke',
        password: 'Dagoretti@2024',
      });
    authToken = res.body.data.accessToken;
  });

  describe('GET /api/assignments', () => {
    it('should list assignments', async () => {
      const res = await request(app)
        .get('/api/assignments')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('POST /api/assignments', () => {
    it('should create an assignment', async () => {
      const res = await request(app)
        .post('/api/assignments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Assignment',
          description: 'Test description',
          subjectId: 'test-subject-id',
          type: 'HOMEWORK',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          maxScore: 100,
        });

      expect(res.status).toBe(201);
    });
  });
});
