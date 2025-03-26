const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");

router.get("/recipe", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/recipe", async (req, res) => {
    try{
        const recipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            difficulty: req.body.difficulty,
            ingredients: req.body.ingredients,
            steps: req.body.steps
        });
        await recipe.save();
        res.status(201).json({ message: 'recipe created' });
    } catch (err) {
        console.log(err)
    }
})

router.get("/recipe/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (err) {
    console.log(err);
  }
});

router.put("/recipe/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    recipe.name = req.body.name;
    recipe.description = req.body.description;
    recipe.difficulty = req.body.difficulty;
    recipe.ingredients = req.body.ingredients;
    recipe.steps = req.body.steps;
    await recipe.save();
  } catch (err) {
    console.log(err);
  }
});

router.delete("/recipe/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    await recipe.deleteOne();
    res.status(200).json({ message: 'recipe deleted'})
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
