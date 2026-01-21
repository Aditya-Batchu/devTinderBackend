const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    minLength: 3,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  age: {
    type: Number,
    min:18,
  },
  gender: {
    type: String,
    lowercase:true,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender data is not valid");
      }
    }
  },
  password: {
    type: String,
  },
  photoURL: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg?w=1060",
  },
  about: {
    type: String,
    default: "This is about the user.",
  },
  skills: {
    type: [String],
  },
},{
  timestamps: true
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
