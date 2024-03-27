const express = require('express')
const router = express.Router()
const {authMiddleware,verifyLoginMiddleware}=require('../../midlleware/auth')
const db = require('../../db')

router.get('/welcome', authMiddleware,(req, res) => {
    try {
        // let getdataQ = `select * from users where email='${req.query.email}'`
        let getdataQ = `select * from users;`
        console.log(getdataQ);
        db.query(getdataQ, (err, result) => {
            // console.log(result);
            res.render('./userpages/welcome', { msg: `Welcome ${result[0].first_name} ${result[0].last_name}` })
        })
    } catch (error) {
        return res.end("try again to welcome")
    }
}) 


module.exports = router