// untuk express
import express from "express";
import {
  authLoginRouter,
  authLogoutRouter,
  publicRouter,
} from "../route/public-web.js";
import mustacheExpress from "mustache-express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";

export const web = express();
// Konfigurasi body-parser sebagai middleware
web.use(bodyParser.urlencoded({ extended: false }));
web.use(bodyParser.json());
// Konfigurasi Mustache sebagai templating engine
web.engine("html", mustacheExpress());
web.set("view engine", "html");
web.set("views", "./views");

// Konfigurasi session middleware dengan secret key bcrypt
const saltRounds = 10;
const sessionSecret = bcrypt.genSaltSync(saltRounds);

web.use(
  session({
    secret: sessionSecret, // Menggunakan bcrypt hash sebagai secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3 * 60 * 60 * 1000, // Waktu kadaluarsa dalam milidetik (3 jam)
    },
  })
);

web.use(express.json());
web.use(publicRouter);
web.use(authLoginRouter);
web.use(authLogoutRouter);
