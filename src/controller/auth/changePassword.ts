import { Request, Response } from 'express';
import { verifyToken } from '../../middleware/auth';
import { matchBcryptPassword } from '../../modules/auth/helper';
import { generateBcryptPassword } from '../../modules/auth/helper';
import { joiOptions } from '../../modules/auth/helper';
import { changePasswordSchema } from '../../modules/auth/validation';
import { UserRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';

export const changePassword = async (req: Request, res: Response) => {
  try {
    const data = await verifyToken(req);
    const email = data.email;

    const { currentPassword, newPassword, confirmPassword } = req.body;

    const { error } = changePasswordSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }

    if (newPassword !== confirmPassword) {
      return errorMessage({ res, status: 400, message: 'The new password and confirmation password do not match.' });
    }

    const user = await UserRepository.findOne({
      where: {
        email,
      },
      relations: ['roles'],
    });

    if (!user) {
      return errorMessage({ res, status: 428, message: 'Invalid User' });
    }

    const validPassword = await matchBcryptPassword({ password: currentPassword, dbPassword: user.password });

    if (!validPassword) {
      return errorMessage({ res, status: 404, message: 'Invalid old password' });
    }

    user.password = await generateBcryptPassword({ password: newPassword });

    await UserRepository.save(user);

    return successMessage({ res, message: 'Password Changed Successfully' });
  } catch (e) {
    return errorMessage({ res, status: 400, message: e });
  }
};
