const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const db = require('../../../db')

const controller = require("../../../controllers/task/html1/html1")

// router.get('/', authMiddleware,(req, res) => {
//     try {
//         res.render('html1/index')
//     } catch (error) {
//         return res.end("try again to welcome")
//     }
// }) 
router.get('/', authMiddleware, controller.html1)

module.exports = router