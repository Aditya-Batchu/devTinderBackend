const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Update user by userId
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("User updated succesfully");
  } catch (err) {
    res.status(400).send("Update failed: "+err.message);
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

// Adding new user to DB
app.post("/signup", async (req, res) => {
  // Creating a new instance of user model
  const user = new User(req.body);
  console.log(user._id instanceof mongoose.Types.ObjectId);
  try {
    await user.save();
    const names = await user.findSimilarLastNames();
    console.log(names);
    res.send("User saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving user: "+err.message);
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
