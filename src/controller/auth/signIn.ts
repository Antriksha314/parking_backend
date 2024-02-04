import { UserRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { generateAccessToken, generateRefreshToken } from '../../utils/token';
import { joiOptions, matchBcryptPassword } from '../../modules/auth/helper';
import { Request, Response } from 'express';
import { Session } from '../../typeorm/entity/session';
import { signInSchema } from '../../modules/auth/validation';
import { CXN } from '../../typeorm/dataSource';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { error } = signInSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const user = await UserRepository.findOne({ where: { email }, relations: ['sessions'] });

    if (!user) {
      return errorMessage({ res, message: 'User not found' });
    }

    const isMatch = await matchBcryptPassword({ password, dbPassword: user.password });
    if (!isMatch) {
      return errorMessage({ res, message: 'Please provid valid password' });
    }
    const accessToken = await generateAccessToken({ email: user.email });
    const refreshToken = await generateRefreshToken({ email: user.email });
    const isIpExits = user.sessions.find((s) => s.ip === req.ip);

    if (!isIpExits?.id) {
      const session = new Session();
      session.accessToken = accessToken;
      session.refreshToken = refreshToken;
      session.ip = req.ip;
      session.status = true;
      session.systemAddress = {
        platform: req.headers['sec-ch-ua-platform'],
      };
      session.metaJson = { details: req.headers['user-agent'] };

      session.browser = JSON.stringify(req.headers['sec-ch-ua']);
      await CXN.manager.save(session);

      user.sessions = [session];
      await UserRepository.save(user);
    } else {
      const sessionRepo = CXN.getRepository<Session>(Session);
      const updateSession = await sessionRepo.findOne({ where: { id: isIpExits.id } });
      if (updateSession) {
        updateSession.accessToken = accessToken;
        updateSession.refreshToken = refreshToken;
        await sessionRepo.save(updateSession);
      }
    }

    return successMessage({ res, message: 'Login successfully', data: { token: accessToken } });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
