const recipesModel = require('../models/recipesModel');
const userModel = require('../models/userModel');

const listRecipes = async (req, res) => {
  const recipes = await recipesModel.findAllRecipes();
  res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const recipe = await recipesModel.findRecipeById(req.params.id);
  res.render('recipeDetails', { recipe, user: req.user });
};

const recipeEdit = async (req, res) => {
  const { recipeName, ingredientsStr, instructions } = req.body;
  const { id } = req.params;

  await recipesModel.editRecipe(id, recipeName, ingredientsStr, instructions);

  res.redirect('/');
};

const recipeEditForm = async (req, res) => {
  const recipe = await recipesModel.findRecipeById(req.params.id);
  res.render('recipeEdit', { recipe, user: req.user });
};

const recipeDeleteForm = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.findRecipeById(req.params.id);

  if (recipe.userId !== req.user.id) res.redirect('/');
  res.render('recipeDelete', { id, user: req.user, message: null });
};

const recipeDelete = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  const user = await userModel.findById(req.user.id);
  if (user.password === password) {
    await recipesModel.deleteRecipe(id);
    return res.status(200).redirect('/');
  }
  res.render('recipeDelete', { id, user: req.user, message: 'Senha Incorreta.'});
};

const recipeSearch = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(200).render('recipeSearch', { recipes: null, user: req.user });
  const recipes = await recipesModel.findRecipeByName(q);
  return res.status(200).render('recipeSearch', { recipes, user: req.user });
};

const recipeNew = async (req, res) => {
  res.render('recipeNew', { user: req.user });
};

const recipeCreate = async (req, res) => {
  const { recipeName, ingredientsStr, instructions } = req.body;
  const { id, name, lastName } = req.user;
  const userFullName = `${name} ${lastName}`;

  await recipesModel.addRecipe(id, userFullName, recipeName, ingredientsStr, instructions);

  return res.redirect('/');
};

const myRecipes = async (req, res) => {
  const user = req.user;
  const recipes = await recipesModel.findUserRecipes(user.id);
  res.render('myRecipes', { recipes, user });
}

module.exports = {
  listRecipes,
  recipeDetails,
  recipeEditForm,
  recipeEdit,
  recipeDeleteForm,
  recipeDelete,
  recipeSearch,
  recipeNew,
  recipeCreate,
  myRecipes,
};
