import { ChangePassword, ForgotPassword, Login, Register, ResetPassword, VerifyOTP } from './model';

export const returnRegister = {
  type: 'object',
  properties: {
    ...Register,
  },
};
export const requestBodyOfRegister = (schema = Register) => {
  return {
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema,
        },
      },
    },
  };
};

export const returnLogin = {
  type: 'object',
  properties: {
    ...Login,
  },
};
export const requestBodyOfLogin = (schema = Login) => {
  return {
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema,
        },
      },
    },
  };
};

export const returnForgotPassword = {
  type: 'object',
  properties: {
    ...ForgotPassword,
  },
};
export const requestBodyOfForgotPassword = (schema = ForgotPassword) => {
  return {
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema,
        },
      },
    },
  };
};

export const returnResetPassword = {
  type: 'object',
  properties: {
    ...ResetPassword,
  },
};
export const requestBodyOfResetPassword = (schema = ResetPassword) => {
  return {
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema,
        },
      },
    },
  };
};

export const returnChangePassword = {
  type: 'object',
  properties: {
    ...ChangePassword,
  },
};
export const requestBodyOfChangePassword = (schema = ChangePassword) => {
  return {
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema,
        },
      },
    },
  };
};

export const returnVerifyOTP = {
  type: 'object',
  properties: {
    ...VerifyOTP,
  },
};
export const requestBodyOfVerifyOTP = (schema = VerifyOTP) => {
  return {
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema,
        },
      },
    },
  };
};
