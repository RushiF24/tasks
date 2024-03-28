const express = require('express')
const router = express.Router()
const db = require('../../../db')


router.get('/', (req, res) => {
    try {
        console.log('dd44444');
        res.render('timezone');
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})

module.exports = router