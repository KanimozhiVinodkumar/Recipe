// routes/recipeRoutes.js
const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// GET all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one recipe
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create recipe
router.post("/", async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const recipe = new Recipe({ title, ingredients, instructions });
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update recipe
router.put("/:id", async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions },
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE recipe
router.delete("/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
