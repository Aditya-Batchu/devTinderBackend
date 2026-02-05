const validator = require("validator");

const validateSignUpUser = (req) => {
  var { firstName, lastName, emailId, password, age, gender } = req.body;

  // First Name Validation
  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First Name should be of 4-50 characters");
  } else if (!validator.isAlpha(firstName, ["en-US"], { ignore: "- " })) {
    throw new Error("First name is not valid");
  }
  // Last Name Validation
  if (lastName.length < 4 || lastName.length > 50) {
    throw new Error("Last Name should be of 4-50 characters");
  } else if (!validator.isAlpha(lastName, ["en-US"], { ignore: "- " })) {
    throw new Error("Last name is not valid");
  }
  // Email Validation
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not Valid");
  }
  // Password Strength validation
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter Strong Password");
  }
  // Age Verification
  if (age < 18) {
    throw new Error("Above 18 age is required");
  }
  // Gender Check
  gender = gender.toLowerCase();
  if (!validator.isIn(gender, ["male", "female", "others"])) {
    throw new Error("Gender data is not valid");
  }
};

const validateEditUpdates = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignUpUser,
  validateEditUpdates
};
