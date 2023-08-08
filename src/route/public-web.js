import express from "express";
import mahasiswaController from "../controller/mahasiswa-controller.js";
import jurusanController from "../controller/jurusan-controller.js";
import authController from "../controller/auth-controller.js";
import {
  authLoginMiddleware,
  authLogoutMiddleware,
} from "../middleware/auth-middleware.js";
import dataController from "../controller/data-controller.js";
import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const namaGambar = `${timestamp}${ext}`;
    cb(null, namaGambar);
  },
});

const upload = multer({ storage: storage });

const publicRouter = new express.Router();
const authLoginRouter = new express.Router();
const authLogoutRouter = new express.Router();

authLoginRouter.use(authLoginMiddleware);
authLogoutRouter.use(authLogoutMiddleware);

publicRouter.use("/upload", express.static("upload"));
authLoginRouter.get("/mahasiswa", mahasiswaController.get);

publicRouter.get("/mahasiswa/add", mahasiswaController.getAdd);
publicRouter.get(
  "/mahasiswa/update/:idMahasiswa",
  mahasiswaController.getUpdate
);
publicRouter.get("/jurusan", jurusanController.get);
publicRouter.get("/jurusan/add", jurusanController.getAdd);

publicRouter.post("/mahasiswa/update", mahasiswaController.getUpdateMahasiswa);
publicRouter.post("/mahasiswa/add", mahasiswaController.postMahasiswa);
publicRouter.post("/jurusan/add", jurusanController.post);
publicRouter.get("/mahasiswa/:idMahasiswa", mahasiswaController.remove);
publicRouter.get("/jurusan/:idJurusan", jurusanController.remove);

publicRouter.get("/prestasi", dataController.get);
publicRouter.get("/prestasi/:id", dataController.remove);
publicRouter.post("/prestasi", upload.single("gambar"), dataController.post);
publicRouter.get("/pesantren", dataController.getApi);
// login
publicRouter.get("/login", (req, res) => {
  res.render("login");
});
publicRouter.post("/login", authController.post);
authLogoutRouter.get("/logout", authController.logout);

export { publicRouter, authLoginRouter, authLogoutRouter };
