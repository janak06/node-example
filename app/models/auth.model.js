const mongoose = require("mongoose");
const { hashSync, compareSync, genSaltSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { EXPRESS_SECRET } = require("../config/env");

const schema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true, usePushEach: true } // UTC format
);

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

schema.pre("findOneAndUpdate", function (next) {
  const query = this;
  const update = query.getUpdate();
  if (update.password) {
    update.password = hashSync(update.password, genSaltSync(8), null);
    return next();
  }
  return next();
});

schema.methods = {
  authenticateUser(password) {
    return compareSync(password, this.password);
  },

  _hashPassword(password) {
    return hashSync(password, genSaltSync(8), null);
  },

  toJSON() {
    return {
      _id: this._id,
      username: this.username,
      email: this.email,
    };
  },

  createToken() {
    return jwt.sign(
      {
        id: this._id,
        username: this.username,
        email: this.email,
      },
      EXPRESS_SECRET,
      { expiresIn: "30 days" }
    );
  },

  toAuthJSON() {
    return {
      _id: this._id,
      username: this.username,
      email: this.email,
      token: `${this.createToken()}`,
    };
  },
};
module.exports = mongoose.model("User", schema);
