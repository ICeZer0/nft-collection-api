import request from 'supertest';
import express from 'express';
import router from './collections';

const app = express();
app.use(router);

describe('GET /collections/metadata/:walletAddress', () => {
  it('should return Error when no key is present', async () => {
    const response = await request(app).get('/collections/metadata/0x123456');
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      data: null,
      error: {}
    });
  });
});
