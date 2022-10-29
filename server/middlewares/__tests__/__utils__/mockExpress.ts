const mockExpress = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };

  const req = {};

  const next = jest.fn();

  return { res, req, next };
};

export default mockExpress;
