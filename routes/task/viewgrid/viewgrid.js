const express = require('express')
const router = express.Router()
const controller = require("../../../controllers/task/viewgrid/viewgrid")

router.get('/', controller.viewGridForm)

router.all('/serveQuery/:pageno?', controller.serveQuery)


module.exports = router
