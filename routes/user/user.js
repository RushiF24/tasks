const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../midlleware/auth')
const db = require('../../db')

router.get('/welcome', authMiddleware,(req, res) => {
    try {
        // let getdataQ = `select * from users where email='${req.query.email}'`
        let gettaskdataQ = `select * from task_table;`
        console.log(gettaskdataQ);
        db.query(gettaskdataQ, (err, result) => {
            // console.log(result);
            res.render('userpages/taskTable',{data:result})
        })
    } catch (error) {
        return res.end("try again to welcome")
    }
}) 


module.exports = router