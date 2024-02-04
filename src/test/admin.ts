import { describe, it } from 'mocha';
import request from 'supertest';
import expect from 'expect';
require('dotenv').config();

const app = process.env.TEST_SERVER_PATH;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASS;

describe('Admin API', function () {
  describe('Role List  API', function () {
    it(' should return a list of roles', async () => {
      const response = await request(app).post('auth/login').send({
        email,
        password,
      });

      if (response.status === 200) {
        const list = await request(app).get('admin/roles').set('Authorization', `Bearer ${response.body.data.token}`);

        expect(list.status).toEqual(200);
        expect(Array.isArray(list.body.data)).toBe(true);
        expect(list.body.data.length).toBeGreaterThan(0);
      }
    });
  });

  describe('User List  API', function () {
    it(' should return a list of users', async () => {
      const response = await request(app).post('auth/login').send({
        email,
        password,
      });

      if (response.status === 200) {
        const list = await request(app).get('admin/users').set('Authorization', `Bearer ${response.body.data.token}`);

        expect(list.status).toEqual(200);
        expect(Array.isArray(list.body.data)).toBe(true);
        expect(list.body.data.length).toBeGreaterThan(0);
      }
    });
  });
});
