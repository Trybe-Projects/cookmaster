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
      db.getTable('users').select([]).where('email = :email').bind('email', userEmail).execute(),
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
    .then((db) => db.getTable('users').select([]).where('id = :id').bind('id', userId).execute())
    .then((results) => results.fetchOne());

  const [id, email, password, name, lastName] = userData;

  return { id, email, password, name, lastName };
};

const isValid = (email, password, passwordConfirmation, name, lastName) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const namesRegex = /^[a-zA-Z]+$/;
  const message = [];
  if (!email || !emailRegex.test(email)) {
    message.push('O email deve ter o formato email@mail.com');
  }
  if (!password || password.length < 6) {
    message.push('A senha deve ter pelo menos 6 caracteres');
  }
  if (!passwordConfirmation || passwordConfirmation !== password) {
    message.push('As senhas tem que ser iguais');
  }
  if (!name || !namesRegex.test(name) || name.length < 3) {
    message.push('O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }
  if (!lastName || !namesRegex.test(lastName) || lastName.length < 3) {
    message.push('O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }

  return message;
};

const insertUser = async (email, password, firstName, lastName) => {
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, firstName, lastName)
      .execute(),
  );
};

module.exports = {
  findByEmail,
  findById,
  isValid,
  insertUser,
};
