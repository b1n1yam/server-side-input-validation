const express = require("express");
const router = require("express-promise-router")();
const {
  validateRegisterationInput
} = require("../validation/registerationValidator");
const { validateLoginInput } = require("../validation/loginValidator");
const AccountController = require("../controllers/userController");
const bodyParser = require("body-parser");

router
  .route("/signup")
  .post(
    bodyParser.json(),
    validateRegisterationInput,
    AccountController.signUp
  );

router
  .route("/signin")
  .post(bodyParser.json(), validateLoginInput, AccountController.signUp);

module.exports = router;
