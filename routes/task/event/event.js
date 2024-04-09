const express = require('express')
const router = express.Router()
const db = require('../../../db')
const controller = require("../../../controllers/task/event/event")

// router.get('/', (req, res) => {
//     try {
//         res.render('event/event');
//     }
//     catch (error) {
//         res.write("Try again")
//         return res.end()
//     }
// })

router.get('/', controller.event)

module.exports = router