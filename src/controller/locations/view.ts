import { Request, Response } from 'express';
import { LocationRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { getAndDeleteSchema } from '../../modules/locations/validation';
import { joiOptions } from '../../modules/auth/helper';

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = getAndDeleteSchema.validate(req.params, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const location = await LocationRepositry.findOne({ where: { id: parseInt(id) }, relations: ['floors', 'floors.sections'] });

    if (!location) {
      return errorMessage({ res, message: 'Location not found' });
    }

    return successMessage({ res, message: 'Location details', data: location });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
