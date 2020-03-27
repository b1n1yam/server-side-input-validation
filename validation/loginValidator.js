const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = {
  validateLoginInput: async (req, res, next) => {
    let data = req.body;
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
      errors.email = "email field is required";
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = "email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "password field is required";
    }

    if (!Validator.isLength(data.password, { min: 8, max: 16 })) {
      errors.password = "password length must be between 8 - 16 characters";
    }
    if (
      !Validator.isEmpty(data.password) &&
      Validator.isLength(data.password, { min: 8, max: 16 })
    ) {
      if (data.password.search(/[a-z]/) < 0) {
        errors.password =
          "Your password must contain at least one small letter.";
      }
      if (data.password.search(/[0-9]/) < 0) {
        errors.password = "Your password must contain at least one digit.";
      }
      if (data.password.search(/[A-Z]/) < 0) {
        errors.password =
          "Your password must contain at least one capital letter.";
      }
      if (data.password.search(/[!@#$%^&*]/) < 0) {
        errors.password =
          "Your password must contain at least one special character.";
      }
    }
    if (!isEmpty(errors)) {
      return res.status(400).json(errors);
    }

    next();
  }
};
