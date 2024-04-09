const express = require('express')
const router = express.Router()
const controller = require("../../../controllers/task/studentCrudDb/studentCrudDb")

router.get('/', controller.studentCrudDb)

router.get('/students/:pageno?', controller.students)
router.post('/addStudent', controller.addStudent)

module.exports = router