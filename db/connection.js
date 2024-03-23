const util = require("util");
const mysql = require("mysql2");
const dotenv = require("dotenv");

// ensuring our .env file is working
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
// uncomment this line to log contents of .env to the console
// console.log(result.parsed);

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASS,
  database: "company_db",
});

connection.connect();
connection.query = util.promisify(connection.query);

// console.log(process.env.DB_PASS)

module.exports = connection;
