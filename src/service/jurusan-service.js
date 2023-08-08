import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
const get = async () => {
  const result = await prismaClient.jurusan.findMany({});
  return result;
};

const post = async (request) => {
  logger.info("ini");
  logger.info(request);
  const count = await prismaClient.jurusan.count({
    where: {
      jurusan: request,
    },
  });
  logger.info(count);
  if (count > 0) {
    return "400";
  }

  logger.info(request);
  await prismaClient.jurusan.create({
    data: {
      jurusan: request,
    },
  });

  return "200";
};

const remove = async (idJurusan) => {
  logger.info(idJurusan);
  const count = await prismaClient.jurusan.count({
    where: {
      id: idJurusan,
    },
  });

  logger.info(count);
  if (count !== 1) {
    return "400";
  }

  await prismaClient.mahasiswa.deleteMany({
    where: {
      jurusan_id: idJurusan,
    },
  });

  await prismaClient.jurusan.delete({
    where: {
      id: idJurusan,
    },
  });

  return "200";
};
export default {
  get,
  post,
  remove,
};
