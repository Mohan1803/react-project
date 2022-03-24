const express = require("express");
// const app = express();
const { check, validationResult } = require("express-validator");

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

//Signup Route
authRoute.post(
  "/signup",
  check("name", "Name Should Be More Than 3 Characters").isLength(3),
  async (req, res) => {
    try {
      // object de-stucturing
      const { name, dob, emailid, password } = req.body;
      const hashedpassword = bcrypt.hashSync(password, 12);
      const olduser = await user.findOne({
        emailid: emailid,
      });
      if (olduser) {
        res.send("User Already Created With This MailID");
      } else {
        const users = await user.create({
          name,
          dob,
          emailid,
          password: hashedpassword,
        });

        users.save(function (err) {
          if (err) {
            console.log(err);
            res.send("Please Enter Valid Details");
          } else {
            res.send("Details Added Successfully");
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//Login Route
authRoute.post("/login", async (req, res) => {
  try {
    const { name } = req.body;
    const olduser = await user.findOne({
      name: name,
    });

    if (olduser) {
      return res.json({ status: "Loggedin", msg: "Logged IN Successfully" });
    }
    return res.json({
      status: "Login Failed",
      msg: "PLEASE ENTER CORRECT DETAILS",
    });
  } catch (err) {
    console.log(err);
  }
});

//Updating Route
// authRoute.post("/update", async (req, res) => {
//   try {
//     const { name, nameupdate } = req.body;
//     const olduser = await user.findOne({
//       name: name,
//     });

//     if (olduser) {
//       await user.findOneAndUpdate({ name: nameupdate });
//       res
//         .status(200)
//         .json({ message: "Name Updated Successfully " + nameupdate });
//       return;
//     }
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = authRoute;
