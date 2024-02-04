import { Request, Response } from 'express';
import { FloorRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { joiOptions } from '../../modules/auth/helper';
import { getAndDeleteSchema } from '../../modules/floors/validation';

export const deleteFloor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = getAndDeleteSchema.validate(req.params, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const floor = await FloorRepositry.findOne({ where: { id: parseInt(id) } });

    if (!floor) {
      return res.status(200).json({
        successs: false,
        message: 'Floor not found',
      });
    }

    await FloorRepositry.delete({ id: parseInt(id) });
    return successMessage({ res, message: 'Floor Successfully Deleted' });
  } catch (e) {
    return errorMessage({ res, message: e?.message });
  }
};
