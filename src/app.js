const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

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
    res.status(500).send("Error saving user");
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
