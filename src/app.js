const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("Random error");
    res.send("user data");
  } catch (errr) {
    res.status(500).send("Some error contact support team");
  }
});

app.get("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000....");
});
