import { Request, Response } from 'express';
import { UserRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';

export const all = async (_req: Request, res: Response) => {
  try {
    const users = await UserRepository.find({ relations: ['roles', 'sessions'] });
    return successMessage({ res, message: 'User list', data: users });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await UserRepository.findOne({ where: { email } });

    if (!user) {
      return errorMessage({ res, message: 'User not found' });
    }

    return successMessage({ res, message: 'User details', data: user });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
