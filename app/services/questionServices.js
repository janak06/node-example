const Question = require("../models/question.model");
const UserAnswer = require("../models/userAnswer.model");

class QuestionService {
  async getVideo(payload) {
    try {
      const data = await Question.findOne({
        _id: payload.id,
      });

      return data;
    } catch (err) {
      throw err;
    }
  }
  async createVideos(payload, user) {
    try {
      const question = new Question({
        ...payload,
        createdBy: user._id,
      });
      const result = await question.save();

      return result;
    } catch (err) {
      throw err;
    }
  }
  async updateQuestion(payload, user) {
    try {
      const time = await Question.findOne({
        // createdBy: user._id,
        // videoUrl: payload.videoUrl,
        _id: payload._id,
        "questions.time": { $eq: payload.questions[0].time },
      });

      if (time) {
        if (!payload.questions[0]._id) {
          throw Error("Question time already exists. Please try again.");
        }
        await Question.updateOne(
          { "questions._id": payload.questions[0]._id },
          { $set: { "questions.$": payload.questions[0] } }
        );
        const data = await Question.findOne({
          // createdBy: user._id,
          // videoUrl: payload.videoUrl,
          _id: payload._id,
        });
        return data;
      }

      const data = await Question.findOne({
        _id: payload._id,
      });

      if (!data) {
        const question = new Question({
          ...payload,
          createdBy: user._id,
        });
        const result = await question.save();
        return result;
      } else {
        await Question.updateOne(
          { _id: payload._id },
          { $push: { questions: payload.questions } }
        );
        const data1 = await Question.findOne({
          _id: payload._id,
        });
        return data1;
      }
    } catch (err) {
      throw err;
    }
  }
  async getVideos(user) {
    try {
      const { _id } = user;
      // const userVideos = await Question.find({ createdBy: _id });
      const userVideos = await Question.aggregate([
        {
          $match: {
            createdBy: _id,
          },
        },
        {
          $lookup: {
            from: "useranswers",
            localField: "_id",
            foreignField: "questionId",
            as: "userAnswers",
          },
        },
      ]);

      return userVideos;
    } catch (err) {
      throw err;
    }
  }
  async getVideoByUrl(payload, user) {
    try {
      const { _id } = user;
      const { videoUrl } = payload;
      const userVideos = await Question.findOne({
        videoUrl: videoUrl,
        createdBy: _id,
      });
      return userVideos;
    } catch (err) {
      throw err;
    }
  }
  async deleteQuestion(payload, user) {
    try {
      console.log(payload);
      const { _id } = user;
      const { id } = payload;
      await Question.remove({
        _id: id,
        createdBy: _id,
      });
      await UserAnswer.remove({
        questionId: id,
      });
      return true;
    } catch (err) {
      throw err;
    }
  }
}

const questionService = new QuestionService();
module.exports = questionService;
