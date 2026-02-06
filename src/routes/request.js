const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/requset/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const ALLOWED_UPDATES = ["interested", "ignore"];
      const isValidStatus = ALLOWED_UPDATES.includes(status);
      if (!isValidStatus) {
        res.json({ message: "This is not allowed status" }, status);
      }

      // const alreadyExist = ConnectionRequest.find({fromUserId,toUserId});
      // if(alreadyExist){
      //   res.json({message:"Request is already send"});
      // }
      // const reverseRequest = ConnectionRequest.find({fromUserId:toUserId,toUserId:fromUserId});
      // if(reverseRquest){
      //   res.json({message:"A request is already sent to you from the person.You can match now."})
      // }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      const touser = await User.findOne({ _id: toUserId });
      if (!touser) {
        throw new Error("User not found");
      }

      if (existingConnectionRequest) {
        res.json({
          messgae:
            "A Connection request is already made. You can only either accept or ignore",
        });
        return;
      }

      const request = await new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      await request.save();

      res.json({ message: "Connection request sent", request });
    } catch (error) {
      res.json({ message: `ERROR: ${error.message}` });
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggindUser = req.user;
      const { status, requestId } = req.params;

      const ALLOWED_STATUS = ["accepted", "rejected"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({ message: "Status is not valid" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggindUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      return res
        .status(200)
        .json({ message: "Connection Request accepted",  data});
    } catch (err) {
      res.send("ERROR: " + err.message);
    }
  },
);

module.exports = requestRouter;
