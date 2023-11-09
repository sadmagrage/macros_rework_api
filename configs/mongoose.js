const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected !");
  })
  .catch(error => {
    console.error("Error when connecting:", error);
  });

module.exports = mongoose;