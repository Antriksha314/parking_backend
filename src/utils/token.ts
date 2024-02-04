import * as jwt from 'jsonwebtoken';
const jwtToken = require('jsonwebtoken');

export const generateAccessToken = async ({ email }: { email: string }) => {
  try {
    const token = jwt.sign(
      {
        data: {
          email,
        },
      },
      process.env.JWT_ACCESS_TOKEN_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      },
    );
    return token;
  } catch (error) {
    return error;
  }
};

export const verifyAccessToken = async ({ token }: { token: string }) => {
  try {
    const data = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_KEY);
    return data;
  } catch (error) {
    return error;
  }
};

export const decodeAccessToken = async ({ token }: { token: string }) => {
  try {
    const { data } = jwtToken.decode(token);
    return data;
  } catch (error) {
    return error;
  }
};
export const generateRefreshToken = async ({ email }: { email: string }) => {
  try {
    const token = jwt.sign(
      {
        data: { email },
      },
      process.env.JWT_REFRESH_TOKEN_KEY,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      },
    );
    return token;
  } catch (error) {
    return error;
  }
};

export const verifyRefreshToken = async ({ token }: { token: string }) => {
  try {
    const data = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_KEY);
    return data;
  } catch (error) {
    return error;
  }
};
