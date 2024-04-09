const express = require('express')
const router = express.Router()

const kukucube = (req, res) => {
    try {
        res.render('kukuCube/kukucube')
    } catch (error) {
        return res.end("try again to welcome")
    }
}


module.exports = {kukucube}