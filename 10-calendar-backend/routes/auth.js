const { Router } = require("express");
const route = Router();
const { check } = require("express-validator");
const { validaCampo } = require("../middlewares/validar-campos");

const {
  createUser,
  loginUser,
  revalidarToken,
} = require("../controllers/auth");

const { validarJwt } = require("../middlewares/validar-jwt");

route.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es incorrecto").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validaCampo,
  ],
  createUser
);

route.post(
  "/",
  [
    check("email", "El email es incorrecto").isEmail(),
    check("password", "El password es requerido").not().isEmpty(),
    check("password", "El password debe contener mas de 6 caracteres").isLength(
      { min: 6 }
    ),
    validaCampo,
  ],
  loginUser
);

route.get("/renew", validarJwt, revalidarToken);

module.exports = route;
