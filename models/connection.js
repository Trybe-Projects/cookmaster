const mysqlx = require('@mysql/xdevapi');

// const connection = () =>
//   mysqlx
//     .getSession({
//       user: 'root',
//       password: '11219205',
//       host: 'localhost',
//       port: 33060,
//       schema: 'cookmaster',
//     })
//     .then((session) => session.getSchema('cookmaster'))
//     .catch(() => {
//       process.exit(1);
//     });

let schema;
const connection = () => schema ? Promise.resolve(schema) :
  mysqlx.getSession({
    user: 'root',
    password: '11219205',
    host: 'localhost',
    port: 33060,
    schema: 'cookmaster',
  })
  .then((session) => {
    schema = session.getSchema('cookmaster');
    return schema;
  })
  .catch((err) => {
    throw err;
    process.exit(1);
  });

module.exports = connection;
