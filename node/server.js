const express = require("express");
const app = express();
const db = require("./config/db");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
app.use("/auth", authRoute);
app.use("/User", userRoute);
// const con = db.connect();

app.get("/", (req, res) => {
  res.send("Homepage");
  console.log("Connected with Localhost");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening On Port ${port}`);
});

// authRoute
// 1. Login
// 2. Signup
// userRoute
// 3. Get Profile
// 4. Update Profile
// 5. Create Profile
//PostRoute
// 6. Create post
// 7. Update Post
// 8. Get my posts
// 9. Delete a post
