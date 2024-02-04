import { Request, Response } from 'express';
import { RoleRepository } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';

export const get = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const role = await RoleRepository.findOne({ where: { slug } });
    if (!role) {
      return errorMessage({ res, message: 'Role not found' });
    }
    return successMessage({ res, message: 'Role', data: role });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};

export const all = async (_req: Request, res: Response) => {
  try {
    const roles = await RoleRepository.find();
    return successMessage({ res, message: 'Role list', data: roles });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
