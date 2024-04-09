const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const db = require('../db')

const app = express()
require("dotenv").config()
const port = 3000
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require("bcrypt")
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {authMiddleware,verifyLoginMiddleware}=require('../midlleware/auth')
const localStorage = require("localStorage")
const router = express.Router()

// -------------- Register-Login Routes --------------

router.use('/', require('./register/register'))
router.use('/login', require('./login/login'))
router.use('/forgotpassword', require('./forgotpassword/forgotpassword'))
router.use('/logout', require('./logout/logout'))

router.use('/user', require('./user/user'))

// -------------- Dynamic Table Routes --------------
router.use('/dynamic_table', authMiddleware,require('./task/dynamicTable/dynamic_table'))

// -------------- kukucube Routes --------------
router.use('/kukucube', authMiddleware,require('./task/kukucube/kukucube'))

// -------------- tictactoe Routes --------------
router.use('/tictactoe', authMiddleware,require('./task/tictactoe/tictactoe'))

// -------------- HTML/CSS Tasks Routes --------------
router.use('/html1', authMiddleware, require('./task/html1/html1'))
router.use('/html2', authMiddleware, require('./task/html2/html2'))
router.use('/html3', authMiddleware, require('./task/html3/html3'))

// -------------- Student Tasks Routes --------------
router.use('/students', authMiddleware, require('./task/studentCrudFileSys/studentCrudFileSys'))

router.use('/studentsdb', authMiddleware, require('./task/studentCrudDb/studentCrudDb'))

router.use('/studentsExamAttendenceReport', authMiddleware, require('./task/studentsExamAttendence/studentsExamAttendence'))

router.use('/delimeterSearch', authMiddleware, require('./task/delimeteSearch/delimeteSearch'))

// -------------- Job Application Tasks Routes --------------
router.use('/jobapplicationform', authMiddleware, require('./task/jobapplicationform/jobapplicationform'))

router.use('/jobapplicationajax', authMiddleware, require('./task/jobapplicationajax/jobapplicationajax'))

// -------------- JSON Placeholder Tasks Routes --------------
router.use('/jsonplaceholder', authMiddleware, require('./task/jsonplaceholder/jsonplaceholder'))

// -------------- Timezone Tasks Routes --------------
router.use('/timezone', authMiddleware, require('./task/timezone/timezone'))

// -------------- Event Grid Tasks Routes --------------
router.use('/event', authMiddleware, require('./task/event/event'))

// -------------- Dynamic Query Grid Tasks Routes --------------
router.use('/viewgrid', authMiddleware, require('./task/viewgrid/viewgrid'))

module.exports = router;
