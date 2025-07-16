const express = require("express");
const auth = require("../middlewere/auth");
const TodoModel = require("../models/todoModel");
const todoRoute = express.Router();

todoRoute.get("/", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const todos = await TodoModel.find({ authorId: userId });
    // .sort({ createdAt: -1 }); latest first

    return res.status(200).json({
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    return res.status(500).json({
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
});

todoRoute.post("/", auth, async (req, res) => {
  try {
    const { task, description, status, priority, dueDate } = req.body;
    const myTask = await TodoModel.create({
      authorId: req.user._id,
      task,
      description,
      status,
      priority,
      dueDate,
    });

    console.log("Created Task:", myTask);
    console.log(myTask);
    return res.status(201).json({
      message: "task added successfully",
      data: myTask,
    });
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
});

todoRoute.put("/", (req, res) => {});

todoRoute.delete("/", (req, res) => {});

module.exports = todoRoute;
