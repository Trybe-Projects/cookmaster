const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipes = await recipesModel.findAllRecipes();
  res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const recipe = await recipesModel.findRecipeById(req.params.id);
  res.render('recipeDetails', { recipe, user: req.user });
};

const recipeEdit = async (req, res) => {
  const recipe = await recipesModel.findRecipeById(req.params.id);
  res.render('recipeEdit', { recipe, user: req.user });
};

const recipeDelete = async (req, res) => {
  const recipe = await recipesModel.findRecipeById(req.params.id);
  res.render('recipeDelete', { recipe, user: req.user });
};

const recipeSearch = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(200).render('recipeSearch', { recipes: null, user: req.user });
  const recipes = await recipesModel.findRecipeByName(q);
  return res.status(200).render('recipeSearch', { recipes, user: req.user });
};

const recipeNew = async (req, res) => {
  res.render('recipeNew', { user: req.user });
}

const recipeCreate = async (req, res) => {
  const { recipeName, ingredientsStr, instructions } = req.body;
  const { id, name, lastName } = req.user;
  const userFullName = `${name} ${lastName}`;

  await recipesModel.addRecipe(id, userFullName, recipeName, ingredientsStr, instructions);

  return res.redirect('/');
}

module.exports = { listRecipes, recipeDetails, recipeEdit, recipeDelete, recipeSearch, recipeNew, recipeCreate };
