const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/user/login", (req, res) => {
  res.send("login page");
});

// Route and many route handlers
app.use("/user/getData",userAuth, (req, res) => {
  console.log("Route handler 1!!");
  res.send("User data");
});

// app.use("/admin",adminAuth);

app.use("/admin/getAllData",adminAuth,(req,res)=>{
    res.send("All data is send");
})

app.use("/admin/deleteUser",adminAuth,(req,res)=>{
    res.send("Deleted user");
})

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000....");
});
