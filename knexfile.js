require('dotenv').config()

const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/auth";

module.exports = {

  development: {
    client: "pg",
    connection: {
      host: '127.0.0.1',
      user: process.env.PG_USER,
      password: process.env.PG_PWD,
      database: 'foodTruckTracker',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  testing: {
    client: "pg",
    connection: {
      host: '127.0.0.1',
      user: process.env.PG_USER,
      password: process.env.PG_PWD,
      database: 'foodTruckTracker',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },


};
