import { Request, Response } from 'express';
import { SectionRepositry, SpotsRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { VehicleTypeOfSection } from '../../modules/parking/helper';
import { VehicleType } from '../../utils/enums';
import { updateSectionSchema } from '../../modules/sections/validation';
import { joiOptions } from '../../modules/auth/helper';

export const update = async (req: Request, res: Response) => {
  try {
    const { status, type, sectionId } = req.body;

    const { error } = updateSectionSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const section = await SectionRepositry.findOne({ where: { id: sectionId }, relations: ['spots'] });

    if (!section) {
      return errorMessage({ res, message: 'Section not found' });
    }
    // Updating parking sections
    section.status = status;
    if (type === VehicleTypeOfSection.CAR) {
      section.type = VehicleType.CAR;
    } else {
      section.type = VehicleType.BIKE;
    }

    for (const spot of section.spots) {
      const updateSpot = await SpotsRepositry.findOne({ where: { id: spot.id } });

      if (!updateSpot) {
        return errorMessage({ res, message: 'Spot not found' });
      }

      updateSpot.type = section.type;
      await SpotsRepositry.save(updateSpot);
    }
    await SectionRepositry.save(section);

    return successMessage({ res, message: 'Section successfully updated' });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
