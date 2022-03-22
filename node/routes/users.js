const express = require("express");
const app = express();

const router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const db = require("./config/db");

const user = mongoose.model("users", {
  name: String,
  dob: Date,
  emailid: String,
  password: String,
});

router.post("/signup", (req, res) => {
  const name = req.body.name;
  var dob = req.body.dob;
  var emailid = req.body.emailid;
  var password = req.body.password;

  var hashedpassword = bcrypt.hashSync(password, 12);

  const newcust = new user({
    name: name,
    dob: dob,
    emailid: emailid,
    password: hashedpassword,
  });

  newcust.save(function (err) {
    if (err) {
      res.send("Please Enter Valid Details");
    } else {
      res.send("Details Added Successfully");
    }
  });
});

module.exports = router;
