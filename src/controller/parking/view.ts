import { Request, Response } from 'express';
import { ParkingRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { getAndDeleteSchema } from '../../modules/parking/validation';
import { joiOptions } from '../../modules/auth/helper';

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = getAndDeleteSchema.validate(req.params, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const parking = await ParkingRepositry.findOne({ where: { id: parseInt(id) }, relations: ['locations', 'locations.floors'] });

    if (!parking) {
      return errorMessage({ res, message: 'Parking not found' });
    }

    return successMessage({ res, message: 'Parking details', data: parking });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};

export const all = async (_req: Request, res: Response) => {
  try {
    const parking = await ParkingRepositry.find({ relations: ['locations', 'locations.floors'] });

    if (!parking) {
      return errorMessage({ res, message: 'Parking not found' });
    }

    return successMessage({ res, message: 'Parking list details', data: parking });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
