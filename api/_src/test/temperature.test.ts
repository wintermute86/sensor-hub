import request from 'supertest';
import { app } from '../api/app';
import { Temperature } from '../api/model/Temperature';
import {
  establishDbConnection,
  closeConnection,
  clearTable,
} from './databaseHelper';

jest.setTimeout(1000);

describe('API', () => {
  beforeAll(async () => {
    await establishDbConnection([Temperature]);
  });

  describe('GET /temperature', () => {
    let testRecordID: number;

    beforeAll(async (done) => {
      const response = await request(app)
        .post('/api/temperature')
        .set('Content-Type', 'application/json')
        .send({ temperature: 12, device: 2 })
        .expect(200);
      done();

      testRecordID = response.body.id;
    });

    it('should return 200', () => {
      return request(app).get('/api/temperature').expect(200);
    });

    it('should return records by ID', () => {
      return request(app)
        .get(`/api/temperature/${testRecordID}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(testRecordID);
        });
    });
  });

  describe('POST /temperature', () => {
    it('should return 200 when adding a record', () => {
      return request(app)
        .post('/api/temperature')
        .set('Content-Type', 'application/json')
        .send({ temperature: 11, device: 1 })
        .expect(200);
    });

    it('should return 400 when no temperature or device are provided', () => {
      return request(app).post('/api/temperature').expect(400);
    });
  });

  afterAll(async () => {
    await clearTable(Temperature);
    await closeConnection();
  });
});
