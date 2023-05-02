const auth = require("../components/auth/auth.route");
const question = require("../components/question/question.route");
const userAnswer = require("../components/userAnswer/userAnswer.route");
/**
 * Init All routes here
 */
module.exports = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/question", question);
  app.use("/api/answer", userAnswer);
};
