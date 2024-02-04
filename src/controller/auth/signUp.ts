import { generateBcryptPassword, joiOptions } from '../../modules/auth/helper';
import { Request, Response } from 'express';
import { RoleRepository, UserRepository } from '../../utils/repository';
import { CXN } from '../../typeorm/dataSource';
import { User } from '../../typeorm/entity/user';
import { errorMessage, successMessage } from '../../utils/response';
import { roleType } from '../../utils/enums';
import { signUpSchema } from '../../modules/auth/validation';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const { error } = signUpSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }

    if (password !== confirmPassword) {
      return errorMessage({ res, status: 400, message: 'Oops! Your passwords do not match..' });
    }
    const user = await UserRepository.findOne({ where: { email } });
    if (user) {
      return errorMessage({ res, message: 'User already exists' });
    }

    const role = await RoleRepository.findOne({ where: { type: roleType.USER } });

    const create = new User();
    create.firstName = firstName;
    create.lastName = lastName;
    create.email = email;
    create.password = await generateBcryptPassword({ password });

    if (role) {
      create.roles = [role];
    }

    await CXN.manager.save(create);

    return successMessage({ res, message: 'User successfully registered' });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
