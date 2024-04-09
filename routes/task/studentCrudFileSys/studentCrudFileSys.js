const express = require('express')
const router = express.Router()
const fs = require("fs")
const controller = require("../../../controllers/task/studentCrudFileSys/studentCrudFileSys")

router.get('/', controller.studentFileform)

router.post('/addStudent', controller.addStudent)


router.get('/students', controller.students)


router.get('/students/:id', controller.studentsID)


module.exports = router