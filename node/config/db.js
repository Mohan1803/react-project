const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/React_JWT",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB Connecion Successfull");
    }
  }
);
