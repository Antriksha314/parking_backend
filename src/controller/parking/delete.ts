import { Request, Response } from 'express';
import { ParkingRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { getAndDeleteSchema } from '../../modules/parking/validation';
import { joiOptions } from '../../modules/auth/helper';

export const deleteParking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = getAndDeleteSchema.validate(req.params, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const parking = await ParkingRepositry.findOne({ where: { id: parseInt(id) } });

    if (!parking) {
      return res.status(200).json({
        successs: false,
        message: 'Parking not found',
      });
    }

    await ParkingRepositry.delete({ id: parseInt(id) });
    return successMessage({ res, message: 'Parking Successfully Deleted' });
  } catch (e) {
    return errorMessage({ res, message: e?.message });
  }
};
