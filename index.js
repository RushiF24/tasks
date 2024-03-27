const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const db = require('./db')

const app = express()
require("dotenv").config()
const port = 3000
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require("bcrypt")
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {authMiddleware,verifyLoginMiddleware}=require('./midlleware/auth')
const localStorage = require("localStorage")
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/timezone', (req, res) => {
    res.render('timezone')
})


app.use('/', require('./routes/register/register'))
app.use('/login', require('./routes/login/login'))
app.use('/forgotpassword', require('./routes/forgotpassword/forgotpassword'))
app.use('/logout', require('./routes/logout/logout'))
app.use('/user', require('./routes/user/user'))


app.all("*", (req, res) => {
    res.send("Not Found &#128549;")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
