const { createValidationResponse } = require("../../utils/helpers/helpers");
const { isEmpty } = require("../../utils/validator");

class AnswerValidator {
  answer(req, res, next) {
    const errors = {};
    const { questionId, videoUrl } = req.body;

    if (isEmpty(questionId)) {
      errors.questionId = "QuestionId is required";
    }
    if (isEmpty(videoUrl)) {
      errors.videoUrl = "videoUrl is required";
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
}
const answerValidationObj = new AnswerValidator();
module.exports = answerValidationObj;
