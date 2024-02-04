import joi from 'joi';

export const getAndDeleteSchema = joi.object({
  id: joi.number().required().messages({ 'any.required': 'Spot ID is required' }),
});

export const updateSpotSchema = joi.object({
  spotId: joi.number().required().messages({ 'any.required': 'Spot ID is required' }),
  status: joi.string().empty(),
});
