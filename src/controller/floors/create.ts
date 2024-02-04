import { Request, Response } from 'express';
import { Floor } from '../../typeorm/entity/floors';
// import { Rate } from '../../typeorm/entity/rate';
import { Section } from '../../typeorm/entity/sections';
import { Spot } from '../../typeorm/entity/spots';
import { errorMessage, successMessage } from '../../utils/response';
import { VehicleTypeOfSection, generateAlphabetSeries, generateSeries } from '../../modules/parking/helper';
import { CXN } from '../../typeorm/dataSource';
import { VehicleType } from '../../utils/enums';
import { LocationRepositry } from '../../utils/repository';
import { createFloorSchema } from '../../modules/floors/validation';
import { joiOptions } from '../../modules/auth/helper';

//TODO: Need to add validtaions
export const create = async (req: Request, res: Response) => {
  try {
    const { totalSectionsForCar, totalSectionsForBike, locationId, sections } = req.body;

    const { error } = createFloorSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const location = await LocationRepositry.findOne({ where: { id: locationId }, relations: ['floors'] });

    if (!location) {
      return errorMessage({ res, message: 'Parking location not found' });
    }

    // Create and associate floors
    const floor = new Floor();
    floor.totalSections = sections.length;
    floor.totalSectionsForCar = totalSectionsForCar;
    floor.totalSectionsForBike = totalSectionsForBike;
    floor.floorNumber = location.floors.length;

    const floorSections = [];

    // Create and associate sections
    for (const sectionIndex in sections) {
      const spots = [];
      const singleSection = sections[sectionIndex];

      const section = new Section();

      const number = generateAlphabetSeries(sections.length);

      section.number = number[parseInt(sectionIndex)];
      section.totalSpots = singleSection.totalSpots;

      if (singleSection.type === VehicleTypeOfSection.CAR) {
        section.type = VehicleType.CAR;
      } else {
        section.type = VehicleType.BIKE;
      }

      // Create and associate spots
      for (const spotIndex in singleSection.spots) {
        const series = generateSeries(section.number, singleSection.spots.length);

        const newSpot = new Spot();
        newSpot.number = series[parseInt(spotIndex)];
        newSpot.uniqueId = series[parseInt(spotIndex)];
        newSpot.size = singleSection.spots[spotIndex].size;
        newSpot.type = section.type;

        // Save the spots to the database
        await CXN.manager.save(newSpot);
        spots.push(newSpot);
      }

      section.spots = spots;
      //   // Create and associate rates
      //   const rates = sec.price.map((rate) => {
      //     const newRate = new Rate();
      //     newRate.price = rate.price;
      //     newRate.duration = rate.duration;
      //     newRate.type = rate.type;
      //     return newRate;
      //   });

      //   section.price = rates;

      // Save the sections to the database
      await CXN.manager.save(section);

      floorSections.push(section);
    }
    floor.sections = floorSections;

    // Save the floors to the database
    await CXN.manager.save(floor);

    location.floors = [...location.floors, floor];

    // Update the parking location to the database
    await LocationRepositry.save(location);

    return successMessage({ res, message: 'Floor successfully created' });
  } catch (error) {
    return errorMessage({ res, status: 500, message: error });
  }
};
