import { Request, Response } from 'express';
import { FloorRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { getAndDeleteSchema } from '../../modules/floors/validation';
import { joiOptions } from '../../modules/auth/helper';

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = getAndDeleteSchema.validate(req.params, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const floor = await FloorRepositry.findOne({ where: { id: parseInt(id) }, relations: ['sections', 'sections.spots'] });

    if (!floor) {
      return errorMessage({ res, message: 'Floor not found' });
    }

    return successMessage({ res, message: 'Floor details', data: floor });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
