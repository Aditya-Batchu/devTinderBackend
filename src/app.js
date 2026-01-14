const express = require("express");

const app = express();

// Route and many route handlers
app.use(
  "/user",
  (req, res) => {
    console.log("Route handler 1!!");
    res.send("1st request");
  },
  (req, res) => {
    console.log("Route handler 2!!");
    res.send("2nd request");
  }
);

// Only a single response will be sent.
// Route and many route handlers
app.use(
  "/admin",
  [(req, res, next) => {
    console.log("Route handler 1!!");
    next();
  },
  (req, res, next) => {
    console.log("Route handler 2!!");
    next();
  }],
  (req, res, next) => {
    console.log("Route handler 3!!");
    next();
  },
  (req, res, next) => {
    console.log("Route handler 4!!");
    res.send("Final route handler");
    next();
  }
);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000....");
});
