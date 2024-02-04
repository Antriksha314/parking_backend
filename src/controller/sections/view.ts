import { Request, Response } from 'express';
import { SectionRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { getAndDeleteSchema } from '../../modules/sections/validation';
import { joiOptions } from '../../modules/auth/helper';

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = getAndDeleteSchema.validate(req.params, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const section = await SectionRepositry.findOne({ where: { id: parseInt(id) }, relations: ['spots'] });

    if (!section) {
      return errorMessage({ res, message: 'Section not found' });
    }

    return successMessage({ res, message: 'Section details', data: section });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
