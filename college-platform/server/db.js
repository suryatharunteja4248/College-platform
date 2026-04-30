const { Pool } = require("pg");

const isProduction = process.env.DATABASE_URL;

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: "postgres",
        host: "localhost",
        database: "college_db",
        password: "admin1234",
        port: 5432,
      }
);

module.exports = pool;