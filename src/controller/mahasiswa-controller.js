import { logger } from "../application/logging.js";
import mahasiswaService from "../service/mahasiswa-service.js";
import {
  idMahasiswaValidation,
  postValidationMhs,
  updateValidationMhs,
} from "../validation/mahasiswa-validation.js";
import { validate } from "../validation/validation.js";

const get = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Ambil nilai halaman dari query, default ke halaman 1
    const perPage = 5; // Jumlah data per halama
    const skip = (page - 1) * perPage;

    const data = await mahasiswaService.get(skip, perPage, page, req.message);
    res.render("mahasiswa", data);
  } catch (error) {
    next(error);
  }
};

const getAdd = async (req, res, next) => {
  try {
    const jurusan = await mahasiswaService.getAdd();
    res.render("addMahasiswa", { data: jurusan });
  } catch (error) {
    next(error);
  }
};

const postMahasiswa = async (req, res, next) => {
  try {
    req.body.jurusan_id = parseInt(req.body.jurusan_id);
    const result = await validate(postValidationMhs, req.body);
    await mahasiswaService.post(result);
    const message = "berhasil tambah mahasiswa";
    req.message = message;
    get(req, res, next);
  } catch (error) {
    const message = "gagal tambah mahasiswa";
    req.message = message;
    get(req, res, next);
  }
};

const remove = async (req, res, next) => {
  try {
    const idMahasiswa = req.params.idMahasiswa;
    const convert = parseInt(idMahasiswa);
    const request = await validate(idMahasiswaValidation, convert);
    const result = await mahasiswaService.remove(request);
    if (result == "404") {
      const message = "gagal hapus mahasiswa";
      req.message = message;
      get(req, res, next);
    }
    const message = "berhasil tambah mahasiswa";
    req.message = message;
    get(req, res, next);
  } catch (error) {
    const message = "gagal hapus mahasiswa";
    req.message = message;
    get(req, res, next);
  }
};

const getUpdate = async (req, res, next) => {
  const idMahasiswa = req.params.idMahasiswa;
  const convert = parseInt(idMahasiswa);
  const request = await validate(idMahasiswaValidation, convert);
  const result = await mahasiswaService.getUpdate(request);
  if (result == "404") {
    res.redirect("/mahasiswa");
  }

  res.render("editMahasiswa", {
    data: result.data,
    jurusan2: result.jurusan,
  });
};

const getUpdateMahasiswa = async (req, res, next) => {
  try {
    const idMahasiswa = parseInt(req.body.id);
    const validasiId = await validate(idMahasiswaValidation, idMahasiswa);
    const request = await validate(updateValidationMhs, req.body);
    const result = await mahasiswaService.updateMahasiswa(request, validasiId);
    logger.info(result);

    if (result == "404") {
      const message = "gagal update mahasiswa";
      req.message = message;
      get(req, res, next);
    }

    const message = "berhasil update mahasiswa";
    req.message = message;
    get(req, res, next);
  } catch (error) {
    const message = "gagal update mahasiswa";
    req.message = message;
    get(req, res, next);
  }
};
export default {
  get,
  getAdd,
  postMahasiswa,
  remove,
  getUpdate,
  getUpdateMahasiswa,
};
