const mongoose = require("mongoose");

// Userスキーマを定義
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },

  { collection: "users" }
);

// Userモデルを作成
module.exports = mongoose.model("User", UserSchema);
