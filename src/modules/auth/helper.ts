import * as bcrypt from 'bcrypt';

export const generateBcryptPassword = async ({ password }: { password: string }) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    return error;
  }
};

export const matchBcryptPassword = async ({ password, dbPassword }: { password: string; dbPassword: string }) => {
  try {
    const isMatch = await bcrypt.compare(password, dbPassword);
    return isMatch;
  } catch (error) {
    return error;
  }
};

export const joiOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

export const generateOTP = () => {
  const digits = '0123456789';
  const otpLength = 6;
  let otp = '';
  for (let i = 1; i <= otpLength; i++) {
    const index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }
  return otp;
};
