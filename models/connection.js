const mysqlx = require('@mysql/xdevapi');

const connection = () =>
  mysqlx
    .getSession({
      user: 'root',
      password: '11219205',
      host: 'localhost',
      port: 33060,
      schema: 'cookmaster',
    })
    .then((session) => session.getSchema('cookmaster'))
    .catch((err) => {
      process.exit(1);
    });

module.exports = connection;
