const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      //ログイン時に必要な情報
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    password: {
      //ログイン時に必要な情報
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    isAdmin: {
      //ログイン状態を管理するための情報
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
  { collection: "users" }
);

module.exports = mongoose.model("User", UserSchema);
