const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRoute = express.Router();

userRoute.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName lastName about age gender"]);

    res
      .status(200)
      .json({ message: "All pending requests", data: connectionRequests });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userRoute.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggindUser = req.user._id;
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggindUser, status: "accepted" },
        { toUserId: loggindUser, status: "accepted" }
      ],
    }).populate("fromUserId","firstName lastName age gender about");
    const data = connections.map((res)=>res.fromUserId);

    return res.json({message:"Connections",data});
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

module.exports = userRoute;
