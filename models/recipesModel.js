const connection = require('./connection');

const findAllRecipes = async () => {
  const recipesData = await connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

  return recipesData;
};

const findRecipeById = async (recipeId) => {
  const recipeData = await connection()
  .then((db) => db.getTable('recipes')
  .select([])
  .where('id = :id')
  .bind('id', recipeId)
  .execute()
  .then((result) => result.fetchOne()),
  );

  const [id, userId, user, name, ingredients, instructions] = recipeData;

  return { id, userId, user, name, ingredients: ingredients.split(','), instructions };
};

module.exports = { findAllRecipes, findRecipeById };
