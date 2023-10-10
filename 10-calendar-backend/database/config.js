const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB online");
  } catch (e) {
    console.log(e);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConection,
};
