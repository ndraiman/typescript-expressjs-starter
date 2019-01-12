import * as request from 'supertest';
import { app } from './app';

describe('Test the root path', () => {
    test('It should respond to the GET method', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
});
