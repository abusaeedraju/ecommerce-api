const mongoose = require("mongoose");

const mongodbUrl = process.env.MONGO_DB_URL;

const connectDb = () => {
  return mongoose.connect(mongodbUrl);
};

module.exports = { connectDb };
