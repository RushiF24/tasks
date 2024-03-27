var mysql = require('mysql')
require("dotenv").config()


var database = mysql.createConnection({
    multipleStatements: true,
    host: `${process.env.HOST_DB}`,
    user: `${process.env.USER_DB}`,
    password:`${process.env.PASSWORD_DB}`,
    database: `${process.env.DB_DATABASE}`
});

database.connect()
module.exports = database