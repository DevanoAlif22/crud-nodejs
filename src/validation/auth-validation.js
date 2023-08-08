import Joi from "joi";

export const loginValidation = Joi.object({
  username: Joi.string().max(30).required(),
  password: Joi.string().max(30).required(),
});
