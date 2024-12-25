const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = process.env.DATABASE_URL;

// The pool is used to manage a collection of client connections to the PostgreSQL database.
const pool = new Pool({
  connectionString: connectionString,
});

module.exports = { pool };
