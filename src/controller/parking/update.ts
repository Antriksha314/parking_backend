import { Request, Response } from 'express';
import { ParkingRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { updateParkingSchema } from '../../modules/parking/validation';
import { joiOptions } from '../../modules/auth/helper';

export const update = async (req: Request, res: Response) => {
  try {
    const { name, size, capacity, status, parkingId } = req.body;

    const { error } = updateParkingSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const parking = await ParkingRepositry.findOne({ where: { id: parkingId } });

    if (!parking) {
      return errorMessage({ res, message: 'Parking not found' });
    }
    // Updating parking
    parking.name = name;
    parking.size = size;
    parking.capacity = capacity;
    parking.status = status;

    await ParkingRepositry.save(parking);

    return successMessage({ res, message: 'Parking successfully updated' });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
