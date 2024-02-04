import joi from 'joi';

export const createLocationSchema = joi.object({
  propertyName: joi.string().required().messages({
    'any.required': 'Property name is required',
  }),
  address: joi.string().required().messages({
    'any.required': 'Address is required',
  }),
  city: joi.string().required().messages({
    'any.required': 'City is required',
  }),
  state: joi.string().required().messages({
    'any.required': 'State is required',
  }),
  zipCode: joi
    .string()
    .pattern(/^\d{5}(?:[-\s]\d{4})?$/)
    .required()
    .messages({
      'any.required': 'Zip code is required',
      'string.pattern.base': 'Invalid zip code format',
    }),
  size: joi.number().positive().required().messages({
    'any.required': 'Size is required',
    'number.positive': 'Size must be a positive number',
  }),
  country: joi.string().required().messages({
    'any.required': 'Country is required',
  }),
  parkingId: joi
    .string()
    .allow('')
    .pattern(/^[A-Z\d]+$/i)
    .messages({
      'string.pattern.base': 'Invalid parking ID format',
    }),
  floors: joi.array().required().messages({
    'any.required': 'Floors are required',
    'array.base': 'Floors must be an array',
  }),
});

export const getAndDeleteSchema = joi.object({
  id: joi.number().required().messages({ 'any.required': 'Location ID is required' }),
});

export const updateLocationSchema = joi.object({
  locationId: joi.number().required().messages({ 'any.required': 'Location ID is required' }),
  status: joi.string().empty(),
});
