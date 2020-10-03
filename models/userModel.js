const connection = require('./connection');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (userEmail) => {
  const userData = await connection()
    .then((db) =>
      db.getTable('users')
      .select([])
      .where('email = :email')
      .bind('email', userEmail)
      .execute(),
    )
    .then((results) => results.fetchOne());

  const [id, email, password, name, lastName] = userData;

  return { id, email, password, name, lastName };
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (userId) => {
  const userData = await connection()
    .then((db) => db.getTable('users')
    .select([])
    .where('id = :id')
    .bind('id', userId)
    .execute())
    .then((results) => results.fetchOne());

  const [id, email, password, name, lastName] = userData;

  return { id, email, password, name, lastName };
};

module.exports = {
  findByEmail,
  findById,
};
