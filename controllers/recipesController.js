const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipes = await recipesModel.findAllRecipes();
  res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const recipe = await recipesModel.findRecipeById(req.params.id);
  res.render('recipeDetails', { recipe, user: req.user })
}

const recipeEdit = async (req, res) => {
  const recipe = await recipesModel.findRecipeById(req.params.id);
  res.render('recipeEdit', { recipe, user: req.user })
}

const recipeDelete = async (req, res) => {
  const recipe = await recipesModel.findRecipeById(req.params.id);
  res.render('recipeDelete', { recipe, user: req.user })
}

module.exports = { listRecipes, recipeDetails, recipeEdit, recipeDelete };
