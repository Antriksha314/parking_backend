import { Request, Response } from 'express';
import { UserRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';

export const update = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await UserRepository.findOne({ where: { email } });

    if (!user) {
      return errorMessage({ res, message: 'User not found' });
    }

    user.firstName = firstName;
    user.lastName = lastName;

    await UserRepository.save(user);

    return successMessage({ res, message: 'User successfully updated' });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
