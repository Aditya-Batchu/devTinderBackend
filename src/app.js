const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const mongoose = require("mongoose");
const app = express();
const { validateSignUpUser } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

app.use(express.json());

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
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.send("User login Succesfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// Update user by userId
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "age",
      "gender",
      "password",
      "photoURL",
      "about",
      "skills",
    ];
    const isAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isAllowed) {
      throw new Error("Update not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("User updated succesfully");
  } catch (err) {
    res.status(400).send("Update failed: " + err.message);
  }
});

// Delete a user from DB
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted succesfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Find user by _id
app.get("/userid", async (req, res) => {
  try {
    const user = await User.findById("696ca2029b00593908c5bf45");
    if (!user) res.send("User not found");
    else {
      res.send(user);
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});

// Get user by email/key
app.get("/user", async (req, res) => {
  const userEmailId = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: userEmailId });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send("Something went wrong", err);
  }
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
