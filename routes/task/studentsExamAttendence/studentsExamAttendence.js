const express = require('express')
const router = express.Router()
const db = require('../../../db')

const controller = require("../../../controllers/task/studentsExamAttendence/studentsExamAttendence")



router.get('/students/:pageno?', controller.students)

router.get('/examReport', controller.examReport)


router.get('/reportCard/:studentId', controller.reportCard)
router.post('/search', controller.search)

router.post('/filterSearch', controller.filterSearch
)
module.exports = router