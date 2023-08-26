export const joiValidator = (data: any, schema: any) => {
  const validationOptions = {
    allowUnknown: true,
    stripUnknown: true,
    abortEarly: true,
  };

  let errorMessage
  const { value, error } = schema.validate(data, validationOptions);
  if (error) {
    errorMessage = error.details[0].message.replace(/['"]/g, '');

  }
  return { value, errorMessage };
};
