import { NextFunction, Request, Response } from 'express';
import { decodeAccessToken, verifyAccessToken, verifyRefreshToken } from '../utils/token';
import { errorMessage } from '../utils/response';
import { UserRepository } from './..//utils/repository';
import { Role } from '../typeorm/entity/role';

export const verifyToken = async (req: Request) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return Promise.reject('Login is required');
    }
    const bearer = authorization.split(' ');
    const bearerToken = bearer[1];

    let token = null;
    let decodeToken = null;
    let email = null;
    const result = await verifyAccessToken({ token: bearerToken });
    if (result.name === 'TokenExpiredError') {
      decodeToken = await decodeAccessToken({ token: bearerToken });
      email = decodeToken?.email;
    } else {
      token = result?.data;
      email = token?.email;
    }
    const user = await UserRepository.findOne({ where: { email }, relations: ['roles', 'sessions'] });
    if (!user) return Promise.reject('User not found');

    const refresh = user.sessions.find((session) => session.ip === req.ip);
    if (refresh) {
      const refreshResult = await verifyRefreshToken({ token: refresh?.refreshToken });

      if (refreshResult.name === 'TokenExpiredError') {
        return Promise.reject('Login is required');
      }
    }

    return user;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await verifyToken(req);
    return next();
  } catch (error) {
    return errorMessage({ res, status: 403, message: error });
  }
};

export const hasRole = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: any = await verifyToken(req);
      if (data?.roles.some((r: Role) => r.type === role)) {
        return next();
      } else {
        return errorMessage({ res, status: 403, message: 'You dont have permissions to visit this route' });
      }
    } catch (error) {
      return errorMessage({ res, status: 403, message: 'You dont have permissions to visit this route' });
    }
  };
};
