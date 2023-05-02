const { createError, createResponse } = require("../../utils/helpers/helpers");
const userAnswerServices = require("../../services/userAnswerServices");

class AnswerController {
  async answer(req, res) {
    try {
      const data = await userAnswerServices.answer(req.body, req.user);
      if (data) {
        createResponse(res, true, "Answer add successful", data);
      } else {
        createError(
          res,
          {},
          { message: "Unable to answer add, please try again" }
        );
      }
    } catch (e) {
      createError(res, e);
    }
  }
}

const answerController = new AnswerController();
module.exports = answerController;
