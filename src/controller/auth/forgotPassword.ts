import { Request, Response } from 'express';
import { UserRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { generateOTP, joiOptions } from '../../modules/auth/helper';
import { MailOptionsType } from '../../type/service';
import { sendMailFunc } from '../../service/mail';
import { forgotPasswordSchema } from '../../modules/auth/validation';

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { error } = forgotPasswordSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const user = await UserRepository.findOne({
      where: {
        email,
      },
      relations: ['sessions'],
    });

    if (!user) {
      return errorMessage({ res, message: 'User not found' });
    }

    // Set an expiry timer of 5 minutes (300000 ms)
    const expiryTime = new Date(Date.now() + 300000);

    user.otp = await generateOTP();
    user.otpExpiryTime = expiryTime;

    await UserRepository.save(user);

    const mailOptions: MailOptionsType = {
      to: user.email,
      subject: 'Forgot Password',
      html: `Hello, ${user?.firstName} ${user?.lastName}. <br>
      Seems like you forgot your password. If this is true, Open this <a style="font-size: 17px;  font-weight: bold; cursor: pointer; text-decoration: underline;" href="${process.env.MAIL_ENDPOINT}reset-password?t=$">Link</a> to reset your password. <br>And enter below otp  <br> <p style="font-size: 24px; font-weight: bold;">${user.otp}</p>
       <br>If you did not forgot your password you can safely ignore this email.<br>
      Regards.`,
    };

    await sendMailFunc(mailOptions);
    return successMessage({ res, message: 'OTP Successfully send to your register email' });
  } catch (e) {
    return errorMessage({ res, status: 400, message: e });
  }
};
