import { request } from "express";
import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";

const get = async (skip, perPage, page, message) => {
  const totalData = await prismaClient.mahasiswa.count();
  const totalPages = Math.ceil(totalData / perPage); // Hitung total halaman

  const data = await prismaClient.mahasiswa.findMany({
    include: {
      jurusan: true,
    },
    skip,
    take: perPage,
  });
  // Hitung nomor halaman sebelumnya dan selanjutnya
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  return { data, page, totalPages, prevPage, nextPage, message };
};

const getAdd = async () => {
  const result = await prismaClient.jurusan.findMany({});
  return result;
};

const post = async (request) => {
  const result = await prismaClient.mahasiswa.create({
    data: request,
  });
  logger.info(result);
  return result;
};

const remove = async (idMahasiswa) => {
  const countMahasiswa = await prismaClient.mahasiswa.count({
    where: {
      id: idMahasiswa,
    },
  });

  if (countMahasiswa !== 1) {
    return "404";
  }

  await prismaClient.mahasiswa.delete({
    where: {
      id: idMahasiswa,
    },
  });

  logger.info("sampe");
  return "200";
};

const getUpdate = async (idMahasiswa) => {
  const countMahasiswa = await prismaClient.mahasiswa.count({
    where: {
      id: idMahasiswa,
    },
  });

  if (countMahasiswa !== 1) {
    return "404";
  }

  const data = await prismaClient.mahasiswa.findFirst({
    where: {
      id: idMahasiswa,
    },
    include: {
      jurusan: true,
    },
  });

  const jurusan = await prismaClient.jurusan.findMany({
    where: {
      NOT: {
        id: data.jurusan_id,
      },
    },
  });
  return { data, jurusan };
};

const updateMahasiswa = async (request, idMahasiswa) => {
  const countMahasiswa = await prismaClient.mahasiswa.count({
    where: {
      id: idMahasiswa,
    },
  });

  logger.info("iniiii count");
  logger.info(countMahasiswa);
  logger.info(request);
  if (countMahasiswa !== 1) {
    return "404";
  }

  await prismaClient.mahasiswa.update({
    where: {
      id: idMahasiswa,
    },
    data: request,
  });

  return "200";
};
export default {
  get,
  getAdd,
  post,
  remove,
  getUpdate,
  updateMahasiswa,
};
