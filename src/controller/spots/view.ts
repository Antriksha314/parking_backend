import { Request, Response } from 'express';
import { SpotsRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { getAndDeleteSchema } from '../../modules/spots/validation';
import { joiOptions } from '../../modules/auth/helper';

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = getAndDeleteSchema.validate(req.params, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const spot = await SpotsRepositry.findOne({ where: { id: parseInt(id) } });

    if (!spot) {
      return errorMessage({ res, message: 'Spot not found' });
    }

    return successMessage({ res, message: 'Spot details', data: spot });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
