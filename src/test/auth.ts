import { describe, it } from 'mocha';
import request from 'supertest';
import expect from 'expect';
import { generateAccessToken } from '../utils/token';

const app = process.env.TEST_SERVER_PATH;

describe('Auth API', () => {
  describe('Register API', () => {
    it('should return an error if user already exists', async () => {
      const response = await request(app).post('auth/register').send({
        firstName: 'Simon',
        lastName: 'Smith',
        email: 'admin@yopmail.com',
        password: 'myPassword@123',
      });

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('message', 'User already exists');
    });
    it('should return 200 and a success message when the user is successfully registered', async () => {
      const response = await request(app).post('auth/register').send({
        firstName: 'Simon',
        lastName: 'Smith',
        email: 'simon@example.com',
        password: 'myPassword@123',
      });
      if (!response.body.success) {
        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'User already exists');
      } else {
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('message', 'User successfully registered');
      }
    });
    it('should return 428 and an error message when the firstName field is missing', async () => {
      const response = await request(app).post('auth/register').send({
        lastName: 'Smith',
        email: 'simon@example.com',
        password: 'mypassword',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'First name is required');
    });

    it('should return 428 and an error message when the lastName field is missing', async () => {
      const response = await request(app).post('auth/register').send({
        firstName: 'Simon',
        email: 'simon@example.com',
        password: 'mypassword',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Last name is required');
    });

    it('should return 428 and an error message when the email field is missing', async () => {
      const response = await request(app).post('auth/register').send({
        firstName: 'Simon',
        lastName: 'Smith',
        password: 'mypassword',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Email is required');
    });

    it('should return an error if email is invalid', async () => {
      const response = await request(app).post('auth/register').send({
        firstName: 'Simon',
        lastName: 'Smith',
        email: 'test',
        password: 'mypassword',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Email should be a valid email address');
    });

    it('should return 428 and an error message when the password field is missing', async () => {
      const response = await request(app).post('auth/register').send({
        firstName: 'Simon',
        lastName: 'Smith',
        email: 'simon@example.com',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Password is required');
    });

    it('should return an error if password is too short', async () => {
      const response = await request(app).post('auth/register').send({
        firstName: 'Simon',
        lastName: 'Smith',
        email: 'simon@example.com',
        password: 'myPas@1',
      });
      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Password should be at least 8 characters long');
    });

    it('should return an error if password is invalid', async () => {
      const response = await request(app).post('auth/register').send({
        firstName: 'Simon',
        lastName: 'Smith',
        email: 'simon@example.com',
        password: '123456789',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Password should contain at least one special character');
    });
  });

  describe('Login API', () => {
    it('should return an error if user not found', async () => {
      const response = await request(app).post('auth/login').send({
        email: 'simon1@example.com',
        password: 'myPassword@123',
      });

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    });
    it('should return 200 and a success message when the user is successfully login', async () => {
      const response = await request(app).post('auth/login').send({
        email: 'simon@example.com',
        password: 'myPassword@123',
      });

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('message', 'Login successfully');
    });

    it('should return 428 and an error message when the email field is missing', async () => {
      const response = await request(app).post('auth/login').send({
        password: 'mypassword',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Email is required');
    });

    it('should return an error if email is invalid', async () => {
      const response = await request(app).post('auth/login').send({
        email: 'test',
        password: 'mypassword',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Email should be a valid email address');
    });

    it('should return 428 and an error message when the password field is missing', async () => {
      const response = await request(app).post('auth/login').send({
        email: 'simon@example.com',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Password is required');
    });

    it('should return an error if password is invalid', async () => {
      const response = await request(app).post('auth/login').send({
        email: 'simon@example.com',
        password: '123456789',
      });

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('message', 'Please provid valid password');
    });
  });

  describe('Forgot Password API', () => {
    it('should return an error if user not found', async () => {
      const response = await request(app).post('auth/forgot-password').send({
        email: 'simon1@example.com',
      });

      expect(response.status).toEqual(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    });

    it('should return 200 and a success message when otp successfully send to email', async () => {
      const response = await request(app).post('auth/forgot-password').send({
        email: 'simon@example.com',
      });
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('message', 'OTP Successfully send to your register email');
    });

    it('should return 428 and an error message when the email field is missing', async () => {
      const response = await request(app).post('auth/forgot-password').send();

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Email is required');
    });

    it('should return an error if email is invalid', async () => {
      const response = await request(app).post('auth/forgot-password').send({
        email: 'test',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Email should be a valid email address');
    });
  });

  describe('Verified OTP API', async () => {
    it('should return an error if otp not found', async () => {
      const response = await request(app).post('auth/verify-otp').send({
        otp: '125523',
      });

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('message', 'Invalid OTP');
    });

    it('should return an error if otp expired', async () => {
      const response = await request(app).post('auth/verify-otp').send({
        otp: '123123',
      });

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('message', 'OTP has been expired');
    });

    it('should return 200 and a success message when otp successfully verified', async () => {
      const user = await request(app).post('auth/login').send({
        email: 'simon@example.com',
        password: 'myPassword@123',
      });
      const userDetails = await request(app).get('auth/me').set('Authorization', `Bearer ${user.body.data.token}`);

      const response = await request(app).post('auth/verify-otp').send({
        otp: userDetails.body.data.otp,
      });

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('message', 'OTP verified successfully');
    });

    it('should return 428 and an error message when the otp field is missing', async () => {
      const response = await request(app).post('auth/verify-otp').send();

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'OTP is required');
    });
  });

  describe('Reset Password API', async () => {
    it('should return a 403 error when accessing a protected endpoint without a token', async () => {
      const response = await request(app).post('auth/reset-password').expect(403);

      expect(response.body.message).toEqual('Login is required');
    });

    it('should return an error if user not found', async () => {
      const token = await generateAccessToken({ email: 'test@yopmail.com' });

      const response = await request(app).post('auth/reset-password').set('Authorization', `Bearer ${token}`).send({
        password: 'myPassword@123',
        confirmPassword: 'myPassword@123',
      });

      expect(response.status).toEqual(403);
      expect(response.body).toHaveProperty('message', 'User not found');
    });

    it('should return 200 and a success message when the user is successfully registered', async () => {
      const user = await request(app).post('auth/login').send({
        email: 'simon@example.com',
        password: 'myPassword@123',
      });

      const response = await request(app).post('auth/reset-password').set('Authorization', `Bearer ${user.body.data.token}`).send({
        password: 'myPassword@123',
        confirmPassword: 'myPassword@123',
      });

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('message', 'Password Changed Successfully');
    });

    it('should return 428 and an error message when the password field is missing', async () => {
      const user = await request(app).post('auth/login').send({
        email: 'simon@example.com',
        password: 'myPassword@123',
      });
      const response = await request(app).post('auth/reset-password').set('Authorization', `Bearer ${user.body.data.token}`).send();

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Password is required');
    });

    it('should return 428 and an error message when the password field is missing', async () => {
      const user = await request(app).post('auth/login').send({
        email: 'simon@example.com',
        password: 'myPassword@123',
      });
      const response = await request(app).post('auth/reset-password').set('Authorization', `Bearer ${user.body.data.token}`).send({
        password: 'myPassword@123',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Confirm password is required');
    });

    it('should return an error if password is too short', async () => {
      const user = await request(app).post('auth/login').send({
        email: 'simon@example.com',
        password: 'myPassword@123',
      });
      const response = await request(app).post('auth/reset-password').set('Authorization', `Bearer ${user.body.data.token}`).send({
        password: 'myPas@1',
        confirmPassword: 'myPassword@123',
      });
      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Password should be at least 8 characters long');
    });

    it('should return an error if password is not stronge', async () => {
      const user = await request(app).post('auth/login').send({
        email: 'simon@example.com',
        password: 'myPassword@123',
      });
      const response = await request(app).post('auth/reset-password').set('Authorization', `Bearer ${user.body.data.token}`).send({
        password: '123456789',
        confirmPassword: 'myPassword@123',
      });

      expect(response.status).toEqual(428);
      expect(response.body).toHaveProperty('message', 'Password should contain at least one special character');
    });

    it('should return an error if password and confirm password do not match', async () => {
      const user = await request(app).post('auth/login').send({
        email: 'simon@example.com',
        password: 'myPassword@123',
      });
      const response = await request(app).post('auth/reset-password').set('Authorization', `Bearer ${user.body.data.token}`).send({
        password: 'myPassword@12',
        confirmPassword: 'myPassword@1235',
      });

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('message', 'The new password and confirmation password do not match.');
    });
  });
});
