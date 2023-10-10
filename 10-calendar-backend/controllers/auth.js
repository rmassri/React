const { response } = require("express");
const bcrypt = require("bcrypt");
const { generateJsonWebToken } = require("../helpers/jwt.js");

const Usuario = require("../models/Users");

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El Usuario ya existe",
      });
    }
    usuario = new Usuario(req.body);

    //Encriptar Contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generateJsonWebToken(usuario.id, usuario.name);

    return res.status(201).json({
      ok: true,
      uuid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: "Existio un error al crear el usuario",
    });
  }
};

const loginUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    let user = await Usuario.findOne({ email });
    if (!user) {
      return res.json({
        ok: false,
        msg: "Usuario o Contraseña incorrecta",
      });
    }

    //Confirmar los password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password Incorrecto",
      });
    }
    const token = await generateJsonWebToken(user.id, user.name);

    res.json({
      ok: true,
      uuid: user.id,
      name: user.name,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      msg: "Por favor comuniquese con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uuid, name } = req;
  const token = await generateJsonWebToken(uuid, name);
  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidarToken,
};
