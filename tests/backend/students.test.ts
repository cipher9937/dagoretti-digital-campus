import request from 'supertest';
import app from '../src/app';

describe('Students API', () => {
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

  describe('GET /api/students', () => {
    it('should list students', async () => {
      const res = await request(app)
        .get('/api/students')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /api/students', () => {
    it('should create a new student', async () => {
      const res = await request(app)
        .post('/api/students')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'newstudent@dagorettihigh.ac.ke',
          password: 'StudentPass123!',
          firstName: 'New',
          lastName: 'Student',
          admissionNumber: '20240001',
          gender: 'MALE',
          gradeLevel: 'FORM_4',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });
  });
});
