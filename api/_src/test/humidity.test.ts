import request from 'supertest';
import { app } from '../api/app';
import { Humidity } from '../api/model/Humidity';
import {
  establishDbConnection,
  closeConnection,
  clearTable,
} from './databaseHelper';

jest.setTimeout(1000);

describe('API', () => {
  beforeAll(async () => {
    await establishDbConnection([Humidity]);
  });

  describe('GET /humidity', () => {
    let testRecordID: number;

    beforeAll(async (done) => {
      const response = await request(app)
        .post('/api/humidity')
        .set('Content-Type', 'application/json')
        .send({ humidity: 12, device: 2 })
        .expect(200);
      done();

      testRecordID = response.body.id;
    });

    it('should return 200', async () => {
      return request(app).get('/api/humidity').expect(200);
    });

    it('should return records by ID', () => {
      return request(app)
        .get(`/api/humidity/${testRecordID}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(testRecordID);
        });
    });
  });

  describe('POST /humidity', () => {
    it('should return 200 when adding a record', () => {
      return request(app)
        .post('/api/humidity')
        .set('Content-Type', 'application/json')
        .send({ humidity: 11, device: 1 })
        .expect(200);
    });

    it('should return 400 when no humidity or device are provided', () => {
      return request(app).post('/api/humidity').expect(400);
    });
  });

  afterAll(async () => {
    await clearTable(Humidity);
    await closeConnection();
  });
});
