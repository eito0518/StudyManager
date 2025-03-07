const mongoose = require("mongoose");

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
      default: 0,
    },
    understanding: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  },
  { collection: "tasks" }
);

module.exports = mongoose.model("Task", TaskSchema);
