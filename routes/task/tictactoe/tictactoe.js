const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const controller = require("../../../controllers/task/tictactoe/tictactoe")

router.get('/', authMiddleware,controller.tictactoe) 


module.exports = router