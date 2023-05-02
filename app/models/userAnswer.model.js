const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const schema = mongoose.Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    videoUrl: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    answer: [
      {
        qId: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true, usePushEach: true } // UTC format
);

module.exports = mongoose.model("UserAnswer", schema);
