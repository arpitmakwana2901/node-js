const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true, // fixed typo: 'require' -> 'required'
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: {
    type: Date,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
});

const TodoModel = mongoose.model("todo", todoSchema);
module.exports = TodoModel;
