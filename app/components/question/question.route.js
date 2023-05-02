const express = require("express");
const router = express.Router();
const questionValidation = require("./question.validation");
const questionController = require("./question.controller");
const passport = require("passport");
const PassportErrorHandler = require("../../middleware/passportErrorResponse");

router.post(
  "/create",
  questionValidation.question,
  [
    passport.authenticate("jwt", { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    questionController.createVideo(req, res);
  }
);

router.get(
  "/getVideoById/:id",
  questionValidation.getVideo,
  [
    passport.authenticate("jwt", { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    questionController.getVideo(req, res);
  }
);

router.post(
  "/createQuestion",
  questionValidation.createQuestion,
  [
    passport.authenticate("jwt", { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    questionController.updateQuestion(req, res);
  }
);

router.get(
  "/getVideos",
  [
    passport.authenticate("jwt", { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    questionController.getVideos(req, res);
  }
);

router.get(
  "/getVideoByUrl",
  [
    passport.authenticate("jwt", { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    questionController.getVideoByUrl(req, res);
  }
);

router.delete(
  "/delete/:id",
  questionValidation.deleteQuestion,
  [
    passport.authenticate("jwt", { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    questionController.deleteQuestion(req, res);
  }
);

module.exports = router;
