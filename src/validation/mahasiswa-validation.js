import Joi from "joi";

const postValidationMhs = Joi.object({
  jurusan_id: Joi.number().positive().required(),
  nama: Joi.string().max(25).required(),
  npm: Joi.string().max(25).required(),
});
const updateValidationMhs = Joi.object({
  jurusan_id: Joi.number().positive().required(),
  id: Joi.number().positive().required(),
  nama: Joi.string().max(25).required(),
  npm: Joi.string().max(25).required(),
});

const idMahasiswaValidation = Joi.number().positive().required();

export { postValidationMhs, idMahasiswaValidation, updateValidationMhs };
