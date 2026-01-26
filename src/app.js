const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const mongoose = require("mongoose");
const app = express();
const { validateSignUpUser } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

// Adding new user to DB
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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

// Get User profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;

  console.log(user.lastName + " Sending connection request");
  res.send(user.lastName + " sent a connection request");
});

connectDB()
  .then(() => {
    console.log("Database connection is established...");
    app.listen(3000, () => {
      console.log("Server is listening at port 3000....");
    });
  })
  .catch((err) => {
    console.log("Database is not connected");
  });
