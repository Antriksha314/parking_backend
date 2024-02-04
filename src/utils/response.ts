import { Response } from 'express';

export const errorMessage = ({ res, status = 404, message }: { res: Response; status?: number; message: string }) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

export const successMessage = ({ res, message, data }: { res: Response; message: string; data?: any }) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};
