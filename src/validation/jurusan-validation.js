import Joi from "joi";

export const postJurusanValidation = Joi.string().max(100).required();

export const idJurusanValidation = Joi.number().positive().required();
