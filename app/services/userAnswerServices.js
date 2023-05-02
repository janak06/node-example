const Question = require("../models/question.model");
const Answer = require("../models/userAnswer.model");

class AnswerService {
  async answer(payload, user) {
    try {
      const qid = payload.answer.map((i) => {
        return i.qId;
      });

      const answer = await Answer.findOne({
        userId: user._id,
        questionId: payload.questionId,
        "answer.qId": { $in: qid },
      });

      if (answer) {
        throw Error("already answered");
      }

      const data = await Answer.findOne({
        userId: user._id,
        questionId: payload.questionId,
      });

      if (!data) {
        const answer = new Answer({
          ...payload,
          userId: user._id,
          username: user.username,
          userEmail: user.email,
        });
        const result = await answer.save();
        return result;
      } else {
        await Answer.updateOne(
          { userId: user._id, questionId: payload.questionId },
          { $push: { answer: payload.answer } }
        );
        const data = await Answer.findOne({
          userId: user._id,
          questionId: payload.questionId,
        });
        return data;
      }
    } catch (err) {
      throw err;
    }
  }
}

const answerService = new AnswerService();
module.exports = answerService;
