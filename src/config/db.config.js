require('dotenv').config();

const mysql = require('mysql2');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PW, MYSQL_DB } = process.env;

const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PW,
    database: MYSQL_DB,
});

module.exports = connection;
