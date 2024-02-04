import joi from 'joi';

export const createParkingSchema = joi.object({
  name: joi.string().required().messages({
    'any.required': 'Name is required',
  }),
  size: joi.number().integer().positive().required().messages({
    'any.required': 'Size is required',
    'number.base': 'Size must be a number',
    'number.integer': 'Size must be an integer',
    'number.positive': 'Size must be a positive number',
  }),
  capacity: joi.number().integer().positive().required().messages({
    'any.required': 'Capacity is required',
    'number.base': 'Capacity must be a number',
    'number.integer': 'Capacity must be an integer',
    'number.positive': 'Capacity must be a positive number',
  }),
  locations: joi.array().required().messages({
    'any.required': 'Locations are required',
    'array.base': 'Locations must be an array',
  }),
});
export const getAndDeleteSchema = joi.object({
  id: joi.number().required().messages({ 'any.required': 'Parking ID is required' }),
});

export const updateParkingSchema = joi.object({
  parkingId: joi.number().required().messages({ 'any.required': 'Parking ID is required' }),
  name: joi.string().required().messages({
    'any.required': 'Name is required',
  }),
  size: joi.number().integer().positive().required().messages({
    'any.required': 'Size is required',
    'number.base': 'Size must be a number',
    'number.integer': 'Size must be an integer',
    'number.positive': 'Size must be a positive number',
  }),
  capacity: joi.number().integer().positive().required().messages({
    'any.required': 'Capacity is required',
    'number.base': 'Capacity must be a number',
    'number.integer': 'Capacity must be an integer',
    'number.positive': 'Capacity must be a positive number',
  }),
  status: joi.string().required().messages({
    'any.required': 'Status is required',
  }),
});
