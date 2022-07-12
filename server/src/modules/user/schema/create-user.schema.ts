import Joi from 'joi';

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  cellphone: Joi.string().required()
});

export default createUserSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
