export const authLoginMiddleware = async (req, res, next) => {
  if (req.session.username !== "admin") {
    res.render("login", { message: "Kamu belum login" });
  } else {
    next();
  }
};
export const authLogoutMiddleware = async (req, res, next) => {
  if (!req.session.username) {
    res.render("login", { message: "Kamu belum login, kok mau logout" });
  } else {
    next();
  }
};
