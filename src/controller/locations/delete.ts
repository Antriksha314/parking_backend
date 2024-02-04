import { Request, Response } from 'express';
import { LocationRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { getAndDeleteSchema } from '../../modules/locations/validation';
import { joiOptions } from '../../modules/auth/helper';

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = getAndDeleteSchema.validate(req.params, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const location = await LocationRepositry.findOne({ where: { id: parseInt(id) } });

    if (!location) {
      return res.status(200).json({
        successs: false,
        message: 'Location not foundss',
      });
    }

    await LocationRepositry.delete({ id: parseInt(id) });
    return successMessage({ res, message: 'Location Successfully Deleted' });
  } catch (e) {
    return errorMessage({ res, message: e?.message });
  }
};
