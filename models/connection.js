// const mysqlx = require('@mysql/xdevapi');
// require('dotenv/config');

// const connection = () =>
//   mysqlx
//     .getSession({
//       user: process.env.MYSQL_USER,
//       password: process.env.MYSQL_PASSWORD,
//       host: process.env.MYSQL_HOST,
//       port: 33060,
//       schema: 'cookmaster',
//     })
//     .then((session) => session.getSchema('cookmaster'))
//     .catch(() => {
//       process.exit(1);
//     });

// module.exports = connection;

const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
};

let schema; /* Aqui entra a variável que salva à conexão, começa como undefined */
const connection = () => {
  return schema /* Se schema já existir: */
    ? Promise.resolve(schema) /* Retorna o schema numa Promise: */
    : mysqlx
        .getSession(config)
        .then((session) => {
          /* Quando terminamos de abrir a conexão: */
          schema = session.getSchema('cookmaster'); /* Armazenamos a conexão na variável `schema`*/
          return schema; /* E retornamos o schema de dentro da Promise */
        })
        .catch((err) => {
          /* Caso um erro ocorra: */
          console.error(err); /* Exibimos o erro no console */
          process.exit(1); /* E encerramos o processo */
        });
};

module.exports = connection;
