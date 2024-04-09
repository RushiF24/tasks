const express = require('express')
const router = express.Router()
const localStorage = require("localStorage")
const controller = require('../../controllers/logout/logout')

router.get('/',controller.logout)

module.exports = router