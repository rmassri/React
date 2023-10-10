const { response } = require("express");
const { validationResult } = require("express-validator");
const validaCampo = (req, res = response, next) => {
  const error = validationResult(req);
  console.log(error);
  if (!error.isEmpty()) {
    return res.json({
      ok: false,
      error: error.mapped(),
    });
  }
  next();
};

module.exports = {
  validaCampo,
};
