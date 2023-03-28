const mongoose = require("mongoose");

const handleError = (err) => {
  console.log("Error Name: " + err.name);
  console.log("Error Message: " + err.message);
  console.log("Error Reason: " + err.reason);
  console.log({ ...err });
  console.log(`\nError Details:\n` + err.stack);
};

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
      handleError(err);
      process.exit(1);
    });
};