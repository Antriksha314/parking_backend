import joi from 'joi';

export const createSectionSchema = joi.object({
  totalSpots: joi.number().integer().positive().required().messages({
    'any.required': 'Total spots is required',
    'number.base': 'Total spots must be a number',
    'number.integer': 'Total spots must be an integer',
    'number.positive': 'Total spots must be a positive number',
  }),
  type: joi.string().valid('car', 'bike').required().messages({
    'any.required': 'Type is required',
    'any.only': 'Type must be either "car" or "bike"',
  }),
  floorId: joi.string().required().messages({
    'any.required': 'Floor ID is required',
  }),
  size: joi.string().required().messages({
    'any.required': 'Size is required',
    'string.base': 'Size must be a string',
  }),
  spots: joi.array().required().messages({
    'any.required': 'Spots are required',
    'array.base': 'Spots must be an array',
  }),
});
export const getAndDeleteSchema = joi.object({
  id: joi.number().required().messages({ 'any.required': 'Section ID is required' }),
});

export const updateSectionSchema = joi.object({
  sectionId: joi.number().required().messages({ 'any.required': 'Section ID is required' }),
  status: joi.string().empty(),
  type: joi.string().required().messages({ 'any.required': 'Section type is required' }),
});
