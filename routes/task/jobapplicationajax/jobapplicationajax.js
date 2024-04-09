const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../../midlleware/auth')
const db = require('../../../db')

const controller = require("../../../controllers/task/jobapplicationajax/jobapplicationajax")

router.get('/', controller.jobapplicationajax)
let cid;
//inserting data into database
router.post('/basic_details', controller.basic_details)
router.post('/education', controller.education)

router.post('/work_experience', controller.work_experience)
router.post('/language_known', controller.language_known)
router.post('/tech_known', controller.tech_known)
router.post('/referance_contact', controller.referance_contact)

router.post('/preferances', controller.preferances)

router.get('/candidates',controller.candidates)
router.get('/candidate/:id', controller.candidate)


// update router job application form
router.post('/update_basic_details', controller.update_basic_details)
router.post('/update_education', controller.update_education)

router.post('/update_work_experience', controller.update_work_experience)

router.post('/update_language_known', controller.update_language_known)

router.post('/update_tech_known', controller.update_tech_known)

router.post('/update_referance_contact', controller.update_referance_contact)

router.post('/update_preferances', controller.update_preferances)


router.get('/getcity', (req, res) => {
    try {
        let stateName = req.query.stateName;
        console.log(req);
        let getCityQuery = `select * from city where state_name = '${stateName}'`
        console.log(getCityQuery);
        db.query(getCityQuery, (err, result) => {
            console.log(result);
            res.json({ 'data': result })
        })
    } catch (error) {
        res.write("try again")
        return res.end()
    }
})


module.exports = router