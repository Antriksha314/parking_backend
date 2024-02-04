import { createRole, updateRole } from './model';

export const returnCreateRole = {
  type: 'object',
  properties: {
    ...createRole,
  },
};

export const requestBodyOfCreateRole = (schema = createRole) => {
  return {
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema,
        },
      },
    },
  };
};

export const returnUpdateRole = {
  type: 'object',
  properties: {
    ...updateRole,
  },
};

export const requestBodyOfUpdateRole = (schema = updateRole) => {
  return {
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema,
        },
      },
    },
  };
};
