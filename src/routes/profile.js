const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");


const { userAuth } = require("../middlewares/auth");
const {validateEditUpdates} = require("../utils/validation");

// Get User profile
profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditUpdates(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    // console.log(loggedInUser);
    const user =await User.findOne({emailId:loggedInUser.emailId});
    await user.save();

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
