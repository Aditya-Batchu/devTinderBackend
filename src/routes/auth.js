const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const { validateSignUpUser } = require("../utils/validation");

const authRouter = express.Router();

// Adding new user to DB
authRouter.post("/signup", async (req, res) => {
  // Creating a new instance of user model
  const { firstName, lastName, emailId, password, age, gender } = req.body;
  try {
    const isUserExistWithEmail = await User.find({ emailId: emailId });
    if (isUserExistWithEmail.length >= 1) {
      throw new Error("User already Exists with the email");
    }

    // Validate the user
    validateSignUpUser(req);

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
    });

    // Save user to the DB
    await user.save();
    res.send("User saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error : " + err.message);
  }
});

// Login user
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const passwordMatch = await user.validatePassword(password);
    if (passwordMatch) {
      // Set cookie
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("User login Succesfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout succesfully");
});

module.exports = authRouter;
