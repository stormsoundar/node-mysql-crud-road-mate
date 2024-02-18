import Joi from 'joi';

const authValidation = {};

authValidation.registrationSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

authValidation.loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

export default authValidation;