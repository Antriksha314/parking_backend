import { Request, Response } from 'express';
import { RoleRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';

export const update = async (req: Request, res: Response) => {
  try {
    const { permissions, name } = req.body;
    const { slug } = req.params;
    const role = await RoleRepository.findOne({ where: { slug } });
    if (!role) {
      return errorMessage({ res, message: 'Role not found' });
    }
    role.name = name ?? role.name;
    role.permissions = permissions;
    await RoleRepository.save(role);

    return successMessage({ res, message: 'Role successfully updated' });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
