const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../midlleware/auth')
const db = require('../../db')

const controller = require("../../controllers/user/user")

router.get('/welcome', authMiddleware,controller.welcome) 


module.exports = router