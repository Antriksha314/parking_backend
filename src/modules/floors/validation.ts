import joi from 'joi';

export const createFloorSchema = joi.object({
  totalSectionsForCar: joi.string().required().messages({ 'any.required': 'Total sections for car is required' }),
  totalSectionsForBike: joi.string().required().messages({ 'any.required': 'Total sections for bike is required' }),
  locationId: joi.number().required().messages({ 'any.required': 'Location ID is required' }),
  sections: joi.array().required().messages({ 'any.required': 'Sections array is required' }),
});

export const getAndDeleteSchema = joi.object({
  id: joi.number().required().messages({ 'any.required': 'Floor ID is required' }),
});

export const updateFloorSchema = joi.object({
  floorId: joi.number().required().messages({ 'any.required': 'Floor ID is required' }),
  status: joi.string().empty(),
});
