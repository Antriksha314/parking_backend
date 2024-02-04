import { Request, Response } from 'express';
import { verifyToken } from '../../middleware/auth';
import { generateBcryptPassword, joiOptions } from '../../modules/auth/helper';
import { resetPasswordSchema } from '../../modules/auth/validation';
import { UserRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const data = await verifyToken(req);
    const email = data.email;
    const { password, confirmPassword } = req.body;

    const { error } = resetPasswordSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }

    if (password !== confirmPassword) {
      return errorMessage({ res, status: 400, message: 'The new password and confirmation password do not match.' });
    }

    const user = await UserRepository.findOneBy({
      email,
    });

    if (!user) return errorMessage({ res, status: 400, message: 'Invalid user' });

    user.password = await generateBcryptPassword({ password });

    await UserRepository.save(user);
    return successMessage({ res, message: 'Password Changed Successfully' });
  } catch (e) {
    return errorMessage({ res, status: 400, message: e });
  }
};
