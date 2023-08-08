import { prismaClient } from "../application/database.js";
import fs from "fs";
import path from "path";
import { logger } from "../application/logging.js";

const post = async (gambar, desk) => {
  await prismaClient.prestasi.create({
    data: {
      gambar: gambar,
      deskripsi: desk,
    },
  });
};

const remove = async (id) => {
  const data = await prismaClient.prestasi.findFirst({
    where: {
      id: id,
    },
  });
  const namaGambar = data.gambar;
  const lokasiGambar = path.join("upload/", namaGambar);
  logger.info(lokasiGambar);
  fs.unlink(lokasiGambar, (err) => {
    if (err) {
      logger.info("salah");
    }
  });

  await prismaClient.prestasi.delete({
    where: {
      id: id,
    },
  });
};

export default {
  post,
  remove,
};
