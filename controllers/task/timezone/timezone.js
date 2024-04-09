const express = require('express')
const router = express.Router()
const db = require('../../../db')


const timezone = (req, res) => {
    try {
        console.log('dd44444');
        res.render('timezone/timezone');
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
}

module.exports = {timezone}