const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "internship1",
    password: "samiji2.",
    port: 5432
});

module.exports = pool;