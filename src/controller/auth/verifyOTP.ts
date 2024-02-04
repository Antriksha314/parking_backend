import { Request, Response } from 'express';
import { joiOptions } from '../../modules/auth/helper';
import { otpSchema } from '../../modules/auth/validation';
import { UserRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { generateAccessToken } from '../../utils/token';

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;

    const { error } = otpSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const user = await UserRepository.findOneBy({
      otp,
    });

    if (!user) return errorMessage({ res, status: 400, message: 'Invalid OTP' });

    if (user.otpExpiryTime < new Date()) {
      return errorMessage({ res, status: 400, message: 'OTP has been expired' });
    }
    const accessToken = await generateAccessToken({ email: user.email });
    return successMessage({ res, message: 'OTP verified successfully', data: { accessToken } });
  } catch (e) {
    return errorMessage({ res, status: 400, message: e });
  }
};
