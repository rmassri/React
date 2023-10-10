const { response } = require("express");
const jwt = require("jsonwebtoken");
const validarJwt = (req, res = response, nest) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: "No posee header",
    });
  }
  try {
    console.log(token);
    const { uuid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uuid = uuid;
    req.name = name;
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
  nest();
};

module.exports = {
  validarJwt,
};
