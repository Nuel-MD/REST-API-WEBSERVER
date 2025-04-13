import request from 'supertest';
import app from '../app';

describe('Student Routes', () => {
  let studentId: string;

  it('should create a new student', async () => {
    const response = await request(app)
      .post('/api/v1/students')
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        course: 'Mathematics',
        grade: 90
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    studentId = response.body._id;
  });

  it('should get all students', async () => {
    const response = await request(app).get('/api/v1/students');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a student by ID', async () => {
    const response = await request(app).get(`/api/v1/students/${studentId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', studentId);
  });

  it('should update a student', async () => {
    const response = await request(app)
      .put(`/api/v1/students/${studentId}`)
      .send({ grade: 95 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('grade', 95);
  });

  it('should delete a student', async () => {
    const response = await request(app).delete(`/api/v1/students/${studentId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Student deleted successfully');
  });
});