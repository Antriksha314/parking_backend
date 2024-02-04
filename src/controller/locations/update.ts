import { Request, Response } from 'express';
import { LocationRepositry } from '../../utils/repository';
import { errorMessage, successMessage } from '../../utils/response';
import { updateLocationSchema } from '../../modules/locations/validation';
import { joiOptions } from '../../modules/auth/helper';

export const update = async (req: Request, res: Response) => {
  try {
    const { propertyName, address, city, state, zipCode, size, country, locationId } = req.body;

    const { error } = updateLocationSchema.validate(req.body, joiOptions);

    if (error) {
      return errorMessage({ res, status: 428, message: error.details[0].message });
    }
    const location = await LocationRepositry.findOne({ where: { id: parseInt(locationId) } });

    if (!location) {
      return errorMessage({ res, message: 'Parking location not found' });
    }
    // Updating parking locations
    location.propertyName = propertyName;
    location.address = address;
    location.city = city;
    location.state = state;
    location.zipCode = zipCode;
    location.size = size;
    location.country = country;

    await LocationRepositry.save(location);

    return successMessage({ res, message: 'Location successfully updated' });
  } catch (error) {
    return errorMessage({ res, message: error?.message });
  }
};
