const express = require("express");
// const app = express();
const { check, validationResult } = require("express-validator");

const userRoute = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const db = require("../config/db");
const User = mongoose.model("users", {
  name: String,
  dob: Date,
  emailid: String,
  password: String,
});
//Getting Profile After Login
userRoute.post("/profile", async (req, res) => {
  try {
    const { name } = req.body;
    const olduser = await User.findOne({
      name: name,
    });

    if (olduser) {
      return res.json({ status: "Loggedin", userData: olduser });
    }
    return res.json({
      status: "Login Failed",
      msg: "PLEASE ENTER CORRECT DETAILS",
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = userRoute;
