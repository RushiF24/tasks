const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const db = require('../../../db')

router.get('/', authMiddleware,(req, res) => {
    try {
        res.render('tictactoe/TicTacToe')
    } catch (error) {
        return res.end("try again to welcome")
    }
}) 


module.exports = router