import { Request, Response } from 'express';
// import { Rate } from '../../typeorm/entity/rate';
import { Section } from '../../typeorm/entity/sections';
import { Spot } from '../../typeorm/entity/spots';
import { errorMessage, successMessage } from '../../utils/response';
import { VehicleTypeOfSection, generateAlphabetSeries, generateSeries } from '../../modules/parking/helper';
import { CXN } from '../../typeorm/dataSource';
import { VehicleType } from '../../utils/enums';
import { FloorRepositry } from '../../utils/repository';
import { createSectionSchema } from '../../modules/sections/validation';
import { joiOptions } from '../../modules/auth/helper';

//TODO: Need to add validtaions
export const create = async (req: Request, res: Response) => {
  try {
    const { totalSpots, type, floorId, size } = req.body;

    const { error } = createSectionSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const floor = await FloorRepositry.findOne({ where: { id: floorId }, relations: ['sections'] });

    if (!floor) {
      return errorMessage({ res, message: 'Floor not found' });
    }

    // Create and associate sections
    const section = new Section();
    const number = generateAlphabetSeries(floor.sections.length + 1);
    section.number = `${number.pop()}`;
    section.totalSpots = totalSpots;

    if (type === VehicleTypeOfSection.CAR) {
      section.type = VehicleType.CAR;
    } else {
      section.type = VehicleType.BIKE;
    }
    const newSpots = [];

    // Create and associate spots

    for (let i = 0; i < totalSpots; i++) {
      const series = generateSeries(section.number, totalSpots);
      const spot = new Spot();
      spot.number = series[i];
      spot.uniqueId = series[i];
      spot.size = size;
      spot.type = section.type;

      // Save the spots to the database
      await CXN.manager.save(spot);
      newSpots.push(spot);
    }

    section.spots = newSpots;

    // Save the section to the database
    await CXN.manager.save(section);

    floor.sections = [...floor.sections, section];

    await FloorRepositry.save(floor);

    return successMessage({ res, message: 'Section successfully created' });
  } catch (error) {
    return errorMessage({ res, status: 500, message: error });
  }
};
