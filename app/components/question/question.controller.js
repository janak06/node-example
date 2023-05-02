const { createError, createResponse } = require("../../utils/helpers/helpers");
const questionServices = require("../../services/questionServices");

class QuestionController {
  async getVideo(req, res) {
    try {
      const data = await questionServices.getVideo(req.params, req.user);
      if (data) {
        createResponse(res, true, "Video get successful", data);
      } else {
        createError(
          res,
          {},
          { message: "Unable to video get, please try again" }
        );
      }
    } catch (e) {
      createError(res, e);
    }
  }
  async createVideo(req, res) {
    try {
      const data = await questionServices.createVideos(req.body, req.user);
      if (data) {
        createResponse(res, true, "Video add successful", data);
      } else {
        createError(
          res,
          {},
          { message: "Unable to question add, please try again" }
        );
      }
    } catch (e) {
      createError(res, e);
    }
  }
  async updateQuestion(req, res) {
    try {
      const data = await questionServices.updateQuestion(req.body, req.user);
      if (data) {
        createResponse(res, true, "Question add successful", data);
      } else {
        createError(
          res,
          {},
          { message: "Unable to question add, please try again" }
        );
      }
    } catch (e) {
      createError(res, e);
    }
  }
  async getVideos(req, res) {
    try {
      const data = await questionServices.getVideos(req.user);
      if (data) {
        createResponse(res, true, "Video get successfully", data);
      } else {
        createError(
          res,
          {},
          { message: "something went wrong, please try again" }
        );
      }
    } catch (e) {
      createError(res, e);
    }
  }
  async getVideoByUrl(req, res) {
    try {
      const data = await questionServices.getVideoByUrl(req.query, req.user);
      if (data) {
        createResponse(res, true, "Video get successfully", data);
      } else {
        createError(
          res,
          {},
          { message: "something went wrong, please try again" }
        );
      }
    } catch (e) {
      createError(res, e);
    }
  }
  async deleteQuestion(req, res) {
    try {
      const data = await questionServices.deleteQuestion(req.params, req.user);
      if (data) {
        createResponse(res, true, "Question delete successful", data);
      } else {
        createError(
          res,
          {},
          { message: "Unable to question add, please try again" }
        );
      }
    } catch (e) {
      createError(res, e);
    }
  }
}

const questionController = new QuestionController();
module.exports = questionController;
