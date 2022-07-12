import Joi from 'joi';

const createSchedulingSchema = Joi.object({
  date: Joi.date().required(),
  description: Joi.string().required(),
  user: Joi.object({ id: Number }).required()
});

export default createSchedulingSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
