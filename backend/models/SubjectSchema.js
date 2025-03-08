const mongoose = require("mongoose");

// Subjectスキーマを定義
const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    xp: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  { collection: "subjects" }
);

// Subjectモデルを作成
module.exports = mongoose.model("Subject", SubjectSchema);
