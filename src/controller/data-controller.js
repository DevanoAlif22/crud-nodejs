import axios from "axios";
import { prismaClient } from "../application/database.js";
import { logger } from "../application/logging.js";
import dataService from "../service/data-service.js";

const post = async (req, res, next) => {
  try {
    const namaGambar = req.file.filename;
    const deskripsi = req.body.deskripsi;
    await dataService.post(namaGambar, deskripsi);
    const data = await prismaClient.prestasi.findMany({});
    res.render("prestasi", { data: data });
  } catch (error) {}
};

const remove = async (req, res, next) => {
  const id = parseInt(req.params.id);
  await dataService.remove(id);
  const data = await prismaClient.prestasi.findMany({});
  res.render("prestasi", { data: data });
};
const get = async (req, res, next) => {
  const data = await prismaClient.prestasi.findMany({});
  res.render("prestasi", { data: data });
};

const getApi = async (req, res, next) => {
  try {
    logger.info("data");
    const response = await axios.get(
      "https://api-pesantren-indonesia.vercel.app/provinsi.json"
    );
    const data = response.data;
    res.render("pesantren", { data: data });
  } catch (error) {}
};
export default {
  post,
  get,
  remove,
  getApi,
};
