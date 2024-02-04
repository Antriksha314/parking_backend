import { Request, Response } from 'express';
import { RoleRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const role = await RoleRepository.findOne({ where: { slug } });

    if (!role) {
      return errorMessage({ res, message: 'Role not found' });
    }

    await RoleRepository.delete(role.id);
    return successMessage({ res, message: 'Role successfully deleted' });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
