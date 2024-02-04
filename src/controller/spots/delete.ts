import { Request, Response } from 'express';
import { SpotsRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { getAndDeleteSchema } from '../../modules/spots/validation';
import { joiOptions } from '../../modules/auth/helper';

export const deleteSpot = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = getAndDeleteSchema.validate(req.params, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const spot = await SpotsRepositry.findOne({ where: { id: parseInt(id) } });

    if (!spot) {
      return res.status(200).json({
        successs: false,
        message: 'Spot not found',
      });
    }

    await SpotsRepositry.delete({ id: parseInt(id) });
    return successMessage({ res, message: 'Spot Successfully Deleted' });
  } catch (e) {
    return errorMessage({ res, message: e?.message });
  }
};
