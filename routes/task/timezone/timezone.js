const express = require('express')
const router = express.Router()
const controller = require("../../../controllers/task/timezone/timezone")


router.get('/', controller.timezone)

module.exports = router