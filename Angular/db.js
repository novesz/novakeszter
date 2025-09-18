const mysql = require("mysql2");

const db = mysql.createConnection({
 user: process.env.db_user,
 host: process.env.db_host,
 port: Number(process.env.db_port) || 3306,
 password: process.env.db_password,
 database: process.env.db_name,
});