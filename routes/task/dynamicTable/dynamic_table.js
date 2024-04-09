const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const db = require('../../../db')
const controller = require("../../../controllers/task/dynamicTable/dynamic_table")

router.get('/', authMiddleware,controller.dynamic_table) 

module.exports = router