import { User } from '../../typeorm/entity/user';

export const ResponseItemUser = {
  responses: {
    ...User,
  },
};
