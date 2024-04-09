const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const db = require('../../../db')
const controller = require("../../../controllers/task/jobapplicationform/jobapplicationform")
router.get('/', (req, res) => {
    res.render('jobapplicationform/job_application_form3',{data:''})
})

//inserting data into database
router.post('/addCandidate', controller.jobapplicationform)

router.get('/candidates', controller.candidates)

router.get('/candidate/:id', controller.candidate)

router.post('/updateCandidate', controller.updateCandidate)

module.exports = router