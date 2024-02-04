import joi from 'joi';

export const signUpSchema = joi.object({
  firstName: joi.string().required().messages({ 'any.required': 'First name is required' }),
  lastName: joi.string().required().messages({ 'any.required': 'Last name is required' }),
  email: joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email should be a valid email address',
  }),
  password: joi
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\,./?><]).{8,}$/)
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.min': 'Password should be at least 8 characters long',
      'string.pattern.base': 'Password should include at least one digit, one lowercase letter, one uppercase letter, and one special character',
    }),
  confirmPassword: joi.string().required().messages({ 'any.required': 'Confirm password is required' }),
  userMeta: joi.object().empty(),
});

export const signInSchema = joi.object({
  email: joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email should be a valid email address',
  }),
  password: joi.string().required().messages({ 'any.required': 'Password is required' }),
});

export const changePasswordSchema = joi.object({
  currentPassword: joi.string().required().messages({ 'any.required': 'Old password is required' }),
  newPassword: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\,./?><]).{8,}$/)
    .min(8)
    .required()
    .messages({
      'string.min': 'Password should be at least 8 characters long',
      'string.pattern.base': 'Password should include at least one digit, one lowercase letter, one uppercase letter, and one special character',
      'any.required': 'New password is required',
    }),
  confirmPassword: joi.string().required().messages({ 'any.required': 'Confirm password is required' }),
});

export const resetPasswordSchema = joi.object({
  password: joi
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\,./?><]).{8,}$/)
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.min': 'Password should be at least 8 characters long',
      'string.pattern.base': 'Password should include at least one digit, one lowercase letter, one uppercase letter, and one special character',
    }),
  confirmPassword: joi.string().required().messages({ 'any.required': 'Confirm password is required' }),
});

export const forgotPasswordSchema = joi.object({
  email: joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email should be a valid email address',
  }),
});

export const otpSchema = joi.object({
  otp: joi.string().required().messages({
    'any.required': 'OTP is required',
  }),
});
