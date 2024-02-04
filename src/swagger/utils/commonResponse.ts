export const response200 = () => {
  return {
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {},
        },
      },
    },
  };
};
