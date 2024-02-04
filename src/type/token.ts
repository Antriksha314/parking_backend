import { JwtPayload } from 'jsonwebtoken';

export const isJwtPayload = (data: any): data is JwtPayload => {
  return (data as JwtPayload)?.iat !== undefined;
};
