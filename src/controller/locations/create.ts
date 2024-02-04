import { Request, Response } from 'express';
import { Floor } from '../../typeorm/entity/floors';
import { ParkingLocations } from '../../typeorm/entity/parkingLocations';
// import { Rate } from '../../typeorm/entity/rate';
import { Section } from '../../typeorm/entity/sections';
import { Spot } from '../../typeorm/entity/spots';
import { errorMessage, successMessage } from '../../utils/response';
import { VehicleTypeOfSection, generateAlphabetSeries, generateSeries } from '../../modules/parking/helper';
import { CXN } from '../../typeorm/dataSource';
import { VehicleType } from '../../utils/enums';
import { ParkingRepositry } from '../../utils/repository';
import { createLocationSchema } from '../../modules/locations/validation';
import { joiOptions } from '../../modules/auth/helper';

//TODO: Need to add validtaions
export const create = async (req: Request, res: Response) => {
  try {
    const { propertyName, address, city, state, zipCode, size, country, parkingId, floors } = req.body;

    const { error } = createLocationSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const parking = await ParkingRepositry.findOne({ where: { id: parkingId }, relations: ['locations'] });

    if (!parking) {
      return errorMessage({ res, message: 'Parking not found' });
    }

    // Create and associate parking locations
    const parkingLocation = new ParkingLocations();
    parkingLocation.propertyName = propertyName;
    parkingLocation.address = address;
    parkingLocation.city = city;
    parkingLocation.state = state;
    parkingLocation.zipCode = zipCode;
    parkingLocation.size = size;
    parkingLocation.country = country;

    // Create and associate floors
    for (const floorIndex in floors) {
      const sections = [];
      const floor = floors[floorIndex];
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

    parking.locations = [...parking.locations, parkingLocation];

    // Update the parking entity to the database
    await ParkingRepositry.save(parking);

    return successMessage({ res, message: 'Location successfully created' });
  } catch (error) {
    return errorMessage({ res, status: 500, message: error });
  }
};
