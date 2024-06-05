const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// userModel

router.post(
  "/register",
  asynchandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All Fields are Mandatory");
    }
    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User Already Available");
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password : "+hashedPassword);

    const user = await userModel.create({
        username,
        email,
        password : hashedPassword,
    })
    console.log(user);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("User data not valid");
    }
  })
);
router.post(
  "/login",
  asynchandler(async (req, res) => {
    res.send("hello world");
  })
);
router.get(
  "/current",
  asynchandler(async (req, res) => {
    res.send("hello world");
  })
);

module.exports = router;
