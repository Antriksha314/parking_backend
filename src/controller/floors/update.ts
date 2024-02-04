import { Request, Response } from 'express';
import { FloorRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { updateFloorSchema } from '../../modules/floors/validation';
import { joiOptions } from '../../modules/auth/helper';

export const update = async (req: Request, res: Response) => {
  try {
    const { status, floorId } = req.body;
    const { error } = updateFloorSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const floor = await FloorRepositry.findOne({ where: { id: floorId }, relations: ['sections'] });

    if (!floor) {
      return errorMessage({ res, message: 'Floor not found' });
    }
    // Updating floor
    floor.status = status;

    await FloorRepositry.save(floor);

    return successMessage({ res, message: 'Floor successfully updated' });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
