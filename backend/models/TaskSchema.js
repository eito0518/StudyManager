const mongoose = require("mongoose");

// Taskスキーマを定義
const TaskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 1,
    },
    understanding: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId, // MongoDBのObjectID
      ref: "Subject", // 参照するコレクションを指定 (Subjectモデルがsubjectsコレクションを自動で参照する)
      required: true,
    },
  },

  { collection: "tasks" }
);

// Taskモデルを作成
module.exports = mongoose.model("Task", TaskSchema);
