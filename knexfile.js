'use strict';

module.exports = {
  development: {
    client: 'pg', debug: true,
    connection: `postgres://localhost/bws_dev`

    // migrations: {
    //   directory: path.join(__dirname, 'db', 'migrations')
    // },
    // seeds: {
    //   directory: path.join(__dirname, 'db', 'seeds')
    // }
  },
  test: {
    client: 'pg', debug: false,
    connection: `postgres://localhost/bws_test`
    // migrations: {
    //   directory: path.join(__dirname, 'db', 'migrations')
    // },
    // seeds: {
    //   directory: path.join(__dirname, 'db', 'seeds')
    // }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
