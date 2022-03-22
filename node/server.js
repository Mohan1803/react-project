const express = require("express");
const app = express();
const db = require("./config/db");

require("dotenv").config();

// const con = db.connect();

app.get("/", (req, res) => {
  res.send("Homepage");
  console.log("Connected with Localhost");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening On Port ${port}`);
});
