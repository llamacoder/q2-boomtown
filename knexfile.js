'use strict';

module.exports = {
  development: {
    client: 'pg', debug: false,
    connection: `postgres://localhost:5432/bws_dev`

    // migrations: {
    //   directory: path.join(__dirname, 'db', 'migrations')
    // },
    // seeds: {
    //   directory: path.join(__dirname, 'db', 'seeds')
    // }
  },
  test: {
    client: 'pg', debug: false,
    connection: `postgres://localhost:5432/boomtown_workshop_scheduler_test`
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
