const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
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
      default: ["react", "javascript"],
    },
  },
  {
    timestamps: true,
  },
);

// define instance methods on the schema (use regular functions to access `this`)
userSchema.methods.findSimilarFirstNames = function () {
  return mongoose.model("User").find({ firstName: this.firstName }).exec();
};

userSchema.methods.findSimilarLastNames = function () {
  return mongoose.model("User").find({ lastName: this.lastName }).exec();
};

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ emailId: user.emailId }, "password", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInput) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInput, passwordHash);

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
