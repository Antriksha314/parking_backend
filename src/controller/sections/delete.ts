import { Request, Response } from 'express';
import { SectionRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { getAndDeleteSchema } from '../../modules/sections/validation';
import { joiOptions } from '../../modules/auth/helper';

export const deleteSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = getAndDeleteSchema.validate(req.params, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const section = await SectionRepositry.findOne({ where: { id: parseInt(id) } });

    if (!section) {
      return res.status(200).json({
        successs: false,
        message: 'Section not found',
      });
    }

    await SectionRepositry.delete({ id: parseInt(id) });
    return successMessage({ res, message: 'Section Successfully Deleted' });
  } catch (e) {
    return errorMessage({ res, message: e?.message });
  }
};
