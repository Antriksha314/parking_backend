import { Request, Response } from 'express';
import { Floor } from '../../typeorm/entity/floors';
import { ParkingEntity } from '../../typeorm/entity/parkingEntity';
import { ParkingLocations } from '../../typeorm/entity/parkingLocations';
// import { Rate } from '../../typeorm/entity/rate';
import { Section } from '../../typeorm/entity/sections';
import { Spot } from '../../typeorm/entity/spots';
import { errorMessage, successMessage } from '../../utils/response';
import { VehicleTypeOfSection, generateAlphabetSeries, generateSeries } from '../../modules/parking/helper';
import { CXN } from '../../typeorm/dataSource';
import { VehicleType } from '../../utils/enums';
import { createParkingSchema } from '../../modules/parking/validation';
import { joiOptions } from '../../modules/auth/helper';

//TODO: Need to add validtaions
export const create = async (req: Request, res: Response) => {
  try {
    const { name, size, capacity, locations } = req.body;
    const { error } = createParkingSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    // Create the parking entity
    const parkingEntity = new ParkingEntity();
    parkingEntity.name = name;
    parkingEntity.size = size;
    parkingEntity.capacity = capacity;
    parkingEntity.totalLocations = locations.length;

    const locs = [];
    // Create and associate parking locations
    for (const locIndex in locations) {
      const floors = [];
      const loc = locations[locIndex];
      const parkingLocation = new ParkingLocations();
      parkingLocation.propertyName = loc.propertyName;
      parkingLocation.address = loc.address;
      parkingLocation.city = loc.city;
      parkingLocation.state = loc.state;
      parkingLocation.zipCode = loc.zipCode;
      parkingLocation.size = loc.size;
      parkingLocation.country = loc.country;

      // Create and associate floors
      for (const floorIndex in loc.floors) {
        const sections = [];
        const floor = loc.floors[floorIndex];
        const createFloor = new Floor();
        createFloor.floorNumber = parseInt(floorIndex);
        createFloor.totalSections = floor.sections.length;
        createFloor.totalSectionsForCar = floor.totalSectionsForCar;
        createFloor.totalSectionsForBike = floor.totalSectionsForBike;

        // Create and associate sections
        for (const sectionIndex in floor.sections) {
          const spots = [];
          const singleSection = floor.sections[sectionIndex];
          const section = new Section();
          const number = generateAlphabetSeries(floor.sections.length);

          section.number = number[parseInt(sectionIndex)];
          section.totalSpots = singleSection.spots.length;

          if (singleSection.type === VehicleTypeOfSection.CAR) {
            section.type = VehicleType.CAR;
          } else {
            section.type = VehicleType.BIKE;
          }

          // Create and associate spots
          for (const spotIndex in singleSection.spots) {
            const series = generateSeries(singleSection.number, singleSection.spots.length);

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

          sections.push(section);
        }
        createFloor.sections = sections;
        // createFloor.location = parkingLocation;
        // Save the floors to the database
        await CXN.manager.save(createFloor);

        floors.push(createFloor);
      }

      parkingLocation.floors = floors;

      // Save the parking locations to the database

      await CXN.manager.save(parkingLocation);

      locs.push(parkingLocation);
    }

    parkingEntity.locations = locs;

    // Save the parking entity to the database
    await CXN.manager.save(parkingEntity);

    return successMessage({ res, message: 'Parking successfully created', data: parkingEntity });
  } catch (error) {
    return errorMessage({ res, status: 500, message: error });
  }
};
