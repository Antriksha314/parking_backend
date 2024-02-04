import { Request, Response } from 'express';
import { verifyToken } from '../../middleware/auth';
import { UserRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';

export const userInfo = async (req: Request, res: Response) => {
  try {
    const data = await verifyToken(req);
    const email = data.email;

    const user = await UserRepository.findOne({
      where: {
        email,
      },
      relations: ['roles', 'sessions'],
    });

    if (!user) {
      return errorMessage({ res, status: 428, message: 'Invalid User' });
    }

    return successMessage({ res, message: 'User details', data: user });
  } catch (e) {
    return errorMessage({ res, status: 400, message: e });
  }
};
