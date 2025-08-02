const express = require("express");
const authMiddleware = require("../middleware/auth");
const RecipeModel = require("../models/recipeModel");
const recipeRoute = express.Router();

recipeRoute.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("User ID from authMiddleware:", userId);
    const recipes = await RecipeModel.find({
      createdBy: userId,
    });
    console.log("Fetched recipes:", recipes);
    res.status(200).json({
      message: "Fetched Recipes",
      success: true,
      recipes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /recipe/:id
// When i click edit recipe, it should show the recipe details

recipeRoute.get("/:id", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ recipe });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

recipeRoute.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, instructions, image } = req.body;
    if (!title || !instructions || !image) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }
    console.log("Received recipe request", req.body);

    const recipe = await RecipeModel.create({
      title,
      instructions,
      image,
      createdBy: req.user._id, // Assuming req.user is set by authMiddleware
    });
    console.log("Recipe created", recipe);
    await recipe.save();
    return res.status(201).json({
      message: "Recipe added successfully",
      success: true,
      recipe,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error adding recipe",
      success: false,
      error: error.message,
    });
  }
});

recipeRoute.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await RecipeModel.findByIdAndDelete(id);
    res.status(202).json({
      message: "Recipe Deleted Successfully",
    });
  } catch (error) {
    res.send(400).json({
      message: "Internal Server Error",
    });
  }
});

recipeRoute.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Updating recipe with ID:", id);
    console.log("Received update data:", req.body);

    const recipe = await RecipeModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("Recipe found for update:", recipe);
    console.log("Updated recipe:", recipe);
    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
        success: false,
        recipe,
      });
    }

    return res.status(200).json({
      message: "Recipe updated successfully",
      success: true,
      recipe,
    });
  } catch (error) {
    console.log("Error updating recipe:", error);
    return res.status(400).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
});

module.exports = recipeRoute;
