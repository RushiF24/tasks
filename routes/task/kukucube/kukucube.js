const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const controller = require("../../../controllers/task/kukucube/kukucube")
router.get('/', authMiddleware,controller.kukucube) 


module.exports = router