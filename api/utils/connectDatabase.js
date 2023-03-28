const mongoose = require("mongoose");
const errorLog = require('./errorLog');

exports.connect = () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("DB Connection Successful");
    })
    .catch((err) => {
      console.log("DB Connection Failed\n");
      handleLog(err);
      process.exit(1);
    });
};