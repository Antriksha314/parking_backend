import joi from 'joi';

export const createRoleSchema = joi.object({
  name: joi.string().required().messages({ 'any.required': 'Name is required' }),
  type: joi.string().required().messages({ 'any.required': 'Type is required' }),
  permissions: joi.array().required().messages({ 'any.required': 'Permissions is required' }),
});
