import request from 'supertest';
import app from '../../config/express';

describe('Test the root path', () => {
	test('It should response the GET method', async (done) => {
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
		done();
	});
});
