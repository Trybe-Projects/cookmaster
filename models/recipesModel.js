const connection = require('./connection');

const findAllRecipes = async () => {
  const recipesData = await connection()
    .then((db) => db.getTable('recipes').select(['user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([user, name]) => ({
        user,
        name,
      })),
    );

  return recipesData;
};

module.exports = { findAllRecipes };
