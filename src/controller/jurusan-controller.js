import { logger } from "../application/logging.js";
import jurusanService from "../service/jurusan-service.js";
import {
  idJurusanValidation,
  postJurusanValidation,
} from "../validation/jurusan-validation.js";
import { validate } from "../validation/validation.js";

const getAll = async () => {
  return await jurusanService.get();
};
const get = async (req, res, next) => {
  try {
    const jurusan = await jurusanService.get();
    res.render("jurusan", { data: jurusan });
  } catch (error) {
    next(error);
  }
};

const getAdd = async (req, res, next) => {
  try {
    res.render("addJurusan");
  } catch (error) {
    res.redirect("jurusan");
  }
};

const post = async (req, res, next) => {
  try {
    const request = await validate(postJurusanValidation, req.body.jurusan);
    const jurusan = await jurusanService.post(request);
    if (jurusan == "400") {
      res.render("jurusan", {
        data: await getAll(),
        failed: "Gagal tambah jurusan",
      });
    }
    res.render("jurusan", {
      data: await getAll(),
      success: "Berhasil tambah jurusan",
    });
  } catch (error) {
    res.render("jurusan", {
      data: await getAll(),
      failed: "Gagal tambah jurusan",
    });
  }
};

const remove = async (req, res, next) => {
  try {
    const idJurusan = parseInt(req.params.idJurusan);
    logger.info("ini");
    logger.info(idJurusan);
    const idValidasi = await validate(idJurusanValidation, idJurusan);
    logger.info(idValidasi);
    const request = await jurusanService.remove(idValidasi);
    logger.info(request);
    if (request == "400") {
      res.render("jurusan", {
        data: await getAll(),
        failed: "Gagal hapus jurusan",
      });
    }
    res.render("jurusan", {
      data: await getAll(),
      success: "Berhasil hapus jurusan",
    });
  } catch (error) {
    res.render("jurusan", {
      data: await getAll(),
      failed: "Gagal hapus jurusan",
    });
  }
};

export default {
  get,
  post,
  getAdd,
  remove,
};
