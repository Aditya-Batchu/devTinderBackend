const express = require("express");

const app = express();

// These kind of routes will match only get request
app.get("/user",(req,res)=>{
  res.send({firstName:"Adhitya",lastName:"Batchu"});
})

// These kind of routes will match only post request
app.post("/user",(req,res)=>{
  // saving user data code
  console.log("Saving user data to the database");
  res.send("saved user data");
})

app.patch("/user",(req,res)=>{
  // Minor updates in user profile code
  console.log("updated user data");
  res.send("updated user data");
})

app.delete("/user",(req,res)=>{
  // update user profile code
  console.log("deleted user data");
  res.send("deleted user data");
})

// These kind of routes will match all the incoming requests
app.use("/",(req,res)=>{
  res.send("Hello from the Dashboard!");
})

app.listen(3000,()=>{
  console.log("Server is listening at port 3000....")
});
