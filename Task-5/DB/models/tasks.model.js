const mongoose = require("mongoose");

const taskModel = mongoose.model("tasks", {
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLength: 20,
    minLength: 3,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLength: 20,
    minLength: 3,
  },
  status: {
    type: Boolean,
    default: false,
  },
  dueDate: { type: String, default: Date.now().toFixed() },
});
module.exports = taskModel;
