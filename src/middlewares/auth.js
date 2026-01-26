const jwt = require("jsonwebtoken");
const User = require("../models/user");

const   userAuth = async (req, res, next) => {
  // read the token from the cookies
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
      throw new Error("Invalid Token - Login Again");
    }

    const decodedObj = await jwt.verify(token, "password");
    const { emailId } = decodedObj;

    const user = await User.find({ emailId });

    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }

  // Validate the user
  // Find the user
};

module.exports = {
  userAuth,
};
