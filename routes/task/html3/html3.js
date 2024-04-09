const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const controller = require("../../../controllers/task/html3/html3")
router.get('/', authMiddleware,controller.html3) 


module.exports = router