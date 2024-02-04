import * as bcrypt from 'bcrypt';
const bcryptSalt = process.env.BCRYPT_SALT_ROUNDS as string | 10;

export const GenerateBcryptPassword = async ({ password }: { password: string }) => {
  try {
    const hashPassword = await bcrypt.hash(password, bcryptSalt);
    return hashPassword;
  } catch (error) {
    return error;
  }
};

export const PasswordCheck = async ({ password, dbPassword }: { password: string; dbPassword: string }) => {
  try {
    const isMatch = await bcrypt.compare(password, dbPassword);
    return isMatch;
  } catch (error) {
    return error;
  }
};
