const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
});

// define instance methods on the schema (use regular functions to access `this`)
userSchema.methods.findSimilarFirstNames = function () {
  return mongoose.model("User").find({ firstName: this.firstName }).exec();
};

userSchema.methods.findSimilarLastNames = function () {
  return mongoose.model("User").find({ lastName: this.lastName }).exec();
};

const User = mongoose.model("User", userSchema);
module.exports = User;
