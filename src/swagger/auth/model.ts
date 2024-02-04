export const Register = {
  firstName: {
    type: 'string',
  },
  lastName: {
    type: 'string',
  },
  email: {
    type: 'string',
  },
  password: {
    type: 'string',
  },
  confirmPassword: {
    type: 'string',
  },
};

export const Login = {
  email: {
    type: 'string',
  },
  password: {
    type: 'string',
  },
};

export const ForgotPassword = {
  email: {
    type: 'string',
  },
};

export const ResetPassword = {
  password: {
    type: 'string',
  },
  confirmPassword: {
    type: 'string',
  },
};

export const ChangePassword = {
  currentPassword: {
    type: 'string',
  },
  newPassword: {
    type: 'string',
  },
  confirmPassword: {
    type: 'string',
  },
};

export const VerifyOTP = {
  otp: {
    type: 'string',
  },
};
