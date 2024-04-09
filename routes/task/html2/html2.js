const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const controller = require("../../../controllers/task/html2/html2")

// router.get('/', authMiddleware,(req, res) => {
//     try {
//         res.render('html2/index')
//     } catch (error) {
//         return res.end("try again to welcome")
//     }
// }) 

router.get('/', authMiddleware, controller.html2)
module.exports = router