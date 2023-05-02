const express = require("express");
const router = express.Router();
const answerValidation = require("./userAnswer.validation");
const answerController = require("./userAnswer.controller");
const passport = require("passport");
const PassportErrorHandler = require("../../middleware/passportErrorResponse");

router.post(
  "/create",
  answerValidation.answer,
  [
    passport.authenticate("jwt", { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    answerController.answer(req, res);
  }
);

module.exports = router;
