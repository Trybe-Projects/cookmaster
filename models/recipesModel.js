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

const findRecipeByName = async (query) => {
  const recipesData = await connection()
    .then((db) =>
      db.getTable('recipes')
      .select(['id', 'user', 'name'])
      .where('name like :query')
      .bind('query', `%${query}%`)
      .execute())
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

const addRecipe = async (userId, userName, recipeName, recipeIngredients, recipeInstructions) => {
  await connection()
  .then((db) =>
    db.getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(userId, userName, recipeName, recipeIngredients, recipeInstructions)
    .execute(),
  );
};

const editRecipe = async (recipeId, recipeName, recipeIngredients, recipeInstructions) => {
  await connection()
  .then((db) =>
  db.getTable('recipes')
  .update()
  .set('name', recipeName)
  .set('ingredients', recipeIngredients)
  .set('instructions', recipeInstructions)
  .where('id = :id')
  .bind('id', recipeId)
  .execute()
  );
};

const deleteRecipe = async (recipeId) => {
  await connection()
  .then((db) =>
  db.getTable('recipes')
  .delete()
  .where('id = :id')
  .bind('id', recipeId)
  .execute()
  );
};

const findUserRecipes = async (userId) => {
  const recipesData = await connection()
    .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('user_id = :id')
    .bind('id', userId)
    .execute())
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

module.exports = {
  findAllRecipes,
  findRecipeById,
  findRecipeByName,
  addRecipe,
  editRecipe,
  deleteRecipe,
  findUserRecipes
};
