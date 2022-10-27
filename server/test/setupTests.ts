expect.extend({
  toContainValidationError(response, expected) {

    if(!response) {
      throw new Error("The response can't be null");
    }
    else if(!response.body) {
      throw new Error("The response doesn't have a body");
    }
    else if(!response.body.errors) {
      throw new Error("Body doesn't contain any errors");
    }

    const { errors } = response.body;


    // eslint-disable-next-line
    const matchedError = errors.find((error: any) => {
      return this.equals(error, expected);
    });

    const pass = matchedError ? true : false;

    if(pass) {
      return {
        message: () => `There is not a validation error with the field: ${expected.field} and the message: ${expected.message}`,
        pass
      };
    }

    return {
      message: () => `There is a validation error with the field: ${expected.field} and the message: ${expected.message}`,
      pass
    };
  }
});
