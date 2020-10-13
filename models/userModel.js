const connection = require('./connection');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (userEmail) => {
  const userData = await connection()
    .then((db) =>
      db
      .getTable('users')
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
    .then((db) => db
    .getTable('users')
    .select([])
    .where('id = :id')
    .bind('id', userId)
    .execute())
    .then((results) => results.fetchOne());

  const [id, email, password, name, lastName] = userData;

  return { id, email, password, name, lastName };
};

const emailValidation = (email) => {
  const message = [];
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email || !emailRegex.test(email)) {
    message.push('O email deve ter o formato email@mail.com');
  }

  return message;
};

const namesValidation = (firstName, lastName) => {
  const message = [];
  const namesRegex = /^[a-zA-Z]+$/;
  if (!firstName || !namesRegex.test(firstName) || firstName.length < 3) {
    message.push('O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }
  if (!lastName || !namesRegex.test(lastName) || lastName.length < 3) {
    message.push('O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }

  return message;
};

const passwordValidation = (password, passwordConfirmation) => {
  const message = [];
  if (!password || password.length < 6) {
    message.push('A senha deve ter pelo menos 6 caracteres');
  }
  if (!passwordConfirmation || passwordConfirmation !== password) {
    message.push('As senhas tem que ser iguais');
  }

  return message;
};

const isValid = (email, password, passwordConfirmation, name, lastName) => {
  const emailMessage = emailValidation(email);
  const namesMessage = namesValidation(name, lastName);
  const passwordMessage = passwordValidation(password, passwordConfirmation);
  const message = [...emailMessage, ...namesMessage, ...passwordMessage];

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

const editUser = async (userId, email, password, firstName, lastName) => {
  await connection()
  .then((db) =>
  db.getTable('users')
  .update()
  .set('email', email)
  .set('password', password)
  .set('first_name', firstName)
  .set('last_name', lastName)
  .where('id = :id')
  .bind('id', userId)
  .execute(),
  );
};

module.exports = {
  findByEmail,
  findById,
  isValid,
  insertUser,
  editUser,
};
