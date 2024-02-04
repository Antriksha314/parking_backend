import {
  returnRegister,
  requestBodyOfLogin,
  requestBodyOfRegister,
  returnLogin,
  requestBodyOfChangePassword,
  returnChangePassword,
  requestBodyOfForgotPassword,
  returnForgotPassword,
  requestBodyOfResetPassword,
  returnResetPassword,
  requestBodyOfVerifyOTP,
  returnVerifyOTP,
} from './auth/request';
import { response200 } from './utils/commonResponse';

//TODO Need to add type of each return properties
const jsonDecl = {
  consumes: ['application/json'],
  produces: ['application/json'],
};

export const openAPIDocumentation = {
  openapi: '3.0.2',
  info: {
    title: 'Authentication - Backend',
    description: 'Backend service for authentication management',
    version: '0.1.0',
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_PATH,
      description: 'Server',
    },
  ],
  schemes: ['https', 'http'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
  paths: {
    '/api/admin/users': {
      get: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ['Admin'],
        summary: 'All User list.',
        ...jsonDecl,
        ...response200(),
      },
    },
    // '/api/admin/roles': {
    //   get: {
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //     tags: ['Admin'],
    //     summary: 'All Role list.',
    //     ...jsonDecl,
    //     ...response200(),
    //   },
    // },
    // '/api/role/create': {
    //   post: {
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //     tags: ['Role'],
    //     summary: 'Create role.',
    //     ...jsonDecl,
    //     ...requestBodyOfCreateRole(returnCreateRole as any),
    //     ...response200(),
    //   },
    // },
    // '/api/role/{slug}/update': {
    //   put: {
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //     tags: ['Role'],
    //     summary: 'Update role.',
    //     parameters: [
    //       {
    //         name: 'slug',
    //         in: 'path',
    //         description: 'Slug of role',
    //         required: true,
    //         schema: {
    //           type: 'string',
    //         },
    //       },
    //     ],
    //     ...jsonDecl,
    //     ...requestBodyOfUpdateRole(returnUpdateRole as any),
    //     ...response200(),
    //   },
    // },
    // '/api/role/{slug}': {
    //   get: {
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //     tags: ['Role'],
    //     summary: 'Get role.',
    //     parameters: [
    //       {
    //         name: 'slug',
    //         in: 'path',
    //         description: 'Slug of role',
    //         required: true,
    //         schema: {
    //           type: 'string',
    //         },
    //       },
    //     ],
    //     ...jsonDecl,
    //     ...response200(),
    //   },
    // },
    // '/api/role/{slug}/delete': {
    //   delete: {
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //     tags: ['Role'],
    //     summary: 'Delete role.',
    //     parameters: [
    //       {
    //         name: 'slug',
    //         in: 'path',
    //         description: 'Slug of role',
    //         required: true,
    //         schema: {
    //           type: 'string',
    //         },
    //       },
    //     ],
    //     ...jsonDecl,
    //     ...response200(),
    //   },
    // },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register',
        ...jsonDecl,
        ...requestBodyOfRegister(returnRegister as any),
        ...response200(),
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login',
        ...jsonDecl,
        ...requestBodyOfLogin(returnLogin as any),
        ...response200(),
      },
    },
    '/api/auth/change-password': {
      put: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ['Auth'],
        summary: 'Change Password',
        ...jsonDecl,
        ...requestBodyOfChangePassword(returnChangePassword as any),
        ...response200(),
      },
    },
    '/api/auth/forgot-password': {
      post: {
        tags: ['Auth'],
        summary: 'Forgot Password',
        ...jsonDecl,
        ...requestBodyOfForgotPassword(returnForgotPassword as any),
        ...response200(),
      },
    },
    '/api/auth/reset-password': {
      post: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ['Auth'],
        summary: 'Reset Password',
        ...jsonDecl,
        ...requestBodyOfResetPassword(returnResetPassword as any),
        ...response200(),
      },
    },
    '/api/auth/verify-otp': {
      post: {
        tags: ['Auth'],
        summary: 'Verify your otp',
        ...jsonDecl,
        ...requestBodyOfVerifyOTP(returnVerifyOTP as any),
        ...response200(),
      },
    },
    '/api/auth/me': {
      get: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ['Auth'],
        summary: 'User details',
        ...jsonDecl,
        ...response200(),
      },
    },
  },
};
