import { Request, Response } from 'express';
import { SpotsRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { updateSpotSchema } from '../../modules/spots/validation';
import { joiOptions } from '../../modules/auth/helper';

export const update = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;

    const { error } = updateSpotSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const spot = await SpotsRepositry.findOne({ where: { id } });

    if (!spot) {
      return errorMessage({ res, message: 'Spot not found' });
    }

    spot.status = status;

    await SpotsRepositry.save(spot);

    return successMessage({ res, message: 'Spot successfully updated' });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
