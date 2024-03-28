const express = require('express')
const router = express.Router()
const db = require('../../../db')


router.get('/', (req, res) => {
    try {
        res.render('event/event');
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})

module.exports = router