import { logger } from "../application/logging.js";
import authService from "../service/auth-service.js";
import { loginValidation } from "../validation/auth-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const post = async (req, res, next) => {
  try {
    const request = await validate(loginValidation, req.body);
    const result = await authService.post(request);
    if (result === "404") {
      res.render("login", { message: "gagal login" });
    } else if (result === "200") {
      // Simpan username dalam sesi setelah berhasil login
      req.session.username = request.username;
      logger.info(req.session);
      logger.info(req.session.username);
      res.redirect("/mahasiswa");
    }
  } catch (error) {
    res.redirect("login");
  }
};

const logout = async (req, res, next) => {
  req.session.destroy();
  res.redirect("login");
};
export default {
  post,
  logout,
};
