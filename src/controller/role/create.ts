import { Request, Response } from 'express';
import { CXN } from '../../typeorm/dataSource';
import { Role } from '../../typeorm/entity/role';
import { RoleRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { createRoleSchema } from '../../modules/role/validation';
import { joiOptions } from '../../modules/auth/helper';

export const create = async (req: Request, res: Response) => {
  try {
    const { permissions, name, type } = req.body;

    const { error } = createRoleSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const isRole = await RoleRepository.findOne({ where: { type } });
    if (isRole) {
      return errorMessage({ res, message: 'Role already exits' });
    }

    const role = new Role();
    role.name = name;
    role.permissions = permissions;
    role.type = type;

    await CXN.manager.save(role);
    return successMessage({ res, message: 'Role successfully created' });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
