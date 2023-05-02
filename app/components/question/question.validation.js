const { createValidationResponse } = require("../../utils/helpers/helpers");
const { isEmpty } = require("../../utils/validator");

class QuestionValidator {
  question(req, res, next) {
    const errors = {};
    const { videoUrl } = req.body;

    if (isEmpty(videoUrl)) {
      errors.videoUrl = "videoUrl is required";
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
  createQuestion(req, res, next) {
    const errors = {};
    const { _id } = req.body;

    if (isEmpty(_id)) {
      errors.videoUrl = "Id is required";
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
  getVideo(req, res, next) {
    const errors = {};
    const { id } = req.params;

    if (isEmpty(id)) {
      errors.videoUrl = "Id is required";
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
  deleteQuestion(req, res, next) {
    const errors = {};
    const { id } = req.params;

    if (isEmpty(id)) {
      errors.id = "questionId is required";
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
}
const questionValidationObj = new QuestionValidator();
module.exports = questionValidationObj;
