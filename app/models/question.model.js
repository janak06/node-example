const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const schema = mongoose.Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoUrl: {
      type: String,
    },
    questions: [
      {
        type: {
          type: String,
        },
        time: {
          type: String,
        },
        title: {
          type: String,
        },
        options: [{ type: String }],
        answer: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true, usePushEach: true } // UTC format
);

module.exports = mongoose.model("Videos", schema);
