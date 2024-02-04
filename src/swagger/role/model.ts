export const createRole = {
  name: {
    type: 'string',
  },
  type: {
    type: 'string',
    example: 'ADMIN | USER',
  },
  permissions: {
    type: 'string',
  },
};

export const updateRole = {
  name: {
    type: 'string',
  },
  permissions: {
    type: 'array',
  },
};
