const express = require("express");
// const app = express();

const authRoute = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const db = require("../config/db");

const user = mongoose.model("users", {
  name: String,
  dob: Date,
  emailid: String,
  password: String,
});

authRoute.post("/signup", (req, res) => {
  try {
    // object de-stucturing
    const { name, dob, emailid, password } = req.body;
    const hashedpassword = bcrypt.hashSync(password, 12);

    const newcust = new user({
      name: name,
      dob: dob,
      emailid: emailid,
      password: hashedpassword,
    });

    newcust.save(function (err) {
      if (err) {
        console.log(err);
        res.send("Please Enter Valid Details");
      } else {
        res.send("Details Added Successfully");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

authRoute.post("/login", async (req, res) => {
  try {
    const { name } = req.body;
    const olduser = await user.findOne({
      name: name,
    });

    if (olduser) {
      return res.json({ status: "loggedin", userData: olduser });
    }
    return res.json({ status: "fail", msg: "PLEASE ENTER CORRECT DETAILS" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = authRoute;
