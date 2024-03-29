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

app.use('/dynamic_table', authMiddleware,require('./routes/task/dynamicTable/dynamic_table'))
app.use('/kukucube', authMiddleware,require('./routes/task/kukucube/kukucube'))
app.use('/tictactoe', authMiddleware,require('./routes/task/tictactoe/tictactoe'))

app.use('/html1', authMiddleware, require('./routes/task/html1/html1'))
app.use('/html2', authMiddleware, require('./routes/task/html2/html2'))
app.use('/html3', authMiddleware, require('./routes/task/html3/html3'))

app.use('/students', authMiddleware, require('./routes/task/studentCrudFileSys/studentCrudFileSys'))

app.use('/studentsdb', authMiddleware, require('./routes/task/studentCrudDb/studentCrudDb'))

app.use('/studentsExamAttendenceReport', authMiddleware, require('./routes/task/studentsExamAttendence/studentsExamAttendence'))

app.use('/delimeterSearch', authMiddleware, require('./routes/task/delimeteSearch/delimeteSearch'))

app.use('/jobapplicationform', authMiddleware, require('./routes/task/jobapplicationform/jobapplicationform'))

app.use('/jobapplicationajax', authMiddleware, require('./routes/task/jobapplicationajax/jobapplicationajax'))

app.use('/jsonplaceholder', authMiddleware, require('./routes/task/jsonplaceholder/jsonplaceholder'))

app.use('/timezone', authMiddleware, require('./routes/task/timezone/timezone'))

app.use('/event', authMiddleware, require('./routes/task/event/event'))

app.use('/viewgrid', authMiddleware, require('./routes/task/viewgrid/viewgrid'))

app.all("*", (req, res) => {
    res.send("Not Found &#128549;")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
