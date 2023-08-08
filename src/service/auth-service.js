import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import bcrypt from "bcrypt";

const post = async (request) => {
  const user = await prismaClient.pengguna.findFirst({
    where: {
      username: request.username,
    },
  });
  if (!user) {
    return "404";
  }
  const compare = await bcrypt.compare(request.password, user.password);
  logger.info(compare);

  if (compare === false) {
    return "404";
  }

  return "200";
};

export default {
  post,
};
