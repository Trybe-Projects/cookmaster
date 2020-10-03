const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const { token = '' } = req.cookies || {};
  const recipes = await recipesModel.findAllRecipes();
  res.render('home', { recipes, token });
};

module.exports = listRecipes;
