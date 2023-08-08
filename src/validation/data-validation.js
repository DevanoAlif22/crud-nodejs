import Joi from "joi";

export const prestasiValidation = Joi.object({
  file: Joi.object({
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png") // Ekstensi yang diizinkan
      .required(),
    size: Joi.number()
      .max(5 * 1024 * 1024) // Batas ukuran file (5MB)
      .required(),
  }),
});
