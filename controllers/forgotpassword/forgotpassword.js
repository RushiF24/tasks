const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require("bcrypt")
const md5 = require('md5');

const db = require('../../db')
const {authMiddleware,verifyLoginMiddleware}=require('../../midlleware/auth')

const forgot = async (req, res) => {
    try {
        if (req.method == 'GET') {
            res.render('./forgotpassword/email', { err: '' })
        }
        else {
            let password = req.body.password;
            let salt_key = await bcrypt.genSalt(10)
            let encryptedPassword = md5(password + salt_key)

            let updatePasswordQ = `update users_login set password = '${encryptedPassword}',pw_salt='${salt_key}' where email='${req.body.email}';`
            // console.log('update password when forgot query', updatePasswordQ);
            db.query(updatePasswordQ, (err, result) => {
                res.redirect('/login/loginform')
                // console.log('cvcvc ', JSON.stringify(result), err);
            })
        }
    } catch (error) {
        return res.end("try again for password recovery")
    }

}
// router.all('/', async (req, res) => {
//     try {
//         if (req.method == 'GET') {
//             res.render('./forgotpassword/email', { err: '' })
//         }
//         else {
//             let password = req.body.password;
//             let salt_key = await bcrypt.genSalt(10)
//             let encryptedPassword = md5(password + salt_key)

//             let updatePasswordQ = `update users_login set password = '${encryptedPassword}',pw_salt='${salt_key}' where email='${req.body.email}';`
//             // console.log('update password when forgot query', updatePasswordQ);
//             db.query(updatePasswordQ, (err, result) => {
//                 res.redirect('/login/loginform')
//                 // console.log('cvcvc ', JSON.stringify(result), err);
//             })
//         }
//     } catch (error) {
//         return res.end("try again for password recovery")
//     }

// })

const verify_forgot_password = (req, res) => {
    try {
        let email = req.body.email;

        res.render('./forgotpassword/verifyToken', { email: email, err: "", expire: false })

    } catch (error) {
        return res.end("try again to verify")
    }
}
// router.post('/verify_forgot_password', (req, res) => {
//     try {
//         let email = req.body.email;

//         res.render('./forgotpassword/verifyToken', { email: email, err: "", expire: false })

//     } catch (error) {
//         return res.end("try again to verify")
//     }
// })
const verifyUser = (req, res) => {
    try {
        // console.log(req.query.email, req.query.verifycode);
        let verifyQuery = `select * from users where email = '${req.query.email}' and activation_code = '${req.query.verifycode}'`
        // console.log(verifyQuery);
        db.query(verifyQuery, (err, result) => {
            // console.log(result);
            if (result.length == 0) {
                res.render('verifyToken', { email: req.body.email, err: "please enter valid verification code", expire: false })
            }
            else {

                let registerd_time = new Date(result[0].timestamp);
                let current = new Date()

                let diff = Math.abs(current - registerd_time)
                // console.log(diff)

                if (diff < 3600000) {

                    // let activeUpdateQuery = `update users set active = '1' where email='${req.body.email}'`
                    let activeUpdateQuery = `update users set active = '1' where email='${req.query.email}'`
                    // console.log(activeUpdateQuery);
                    db.query(activeUpdateQuery, (err, result) => {
                        return res.render('./password/confirmPassword', { email: req.query.email, is_forgot: true })
                    })
                }
                else {
                    return res.render('verifyToken', { email: req.body.email, err: "activation code expired", expire: true })
                }

            }
        })
    } catch (error) {
        res.write("try again for verify")
        return res.end()
    }

}
// router.get('/verifyUser', (req, res) => {
//     try {
//         // console.log(req.query.email, req.query.verifycode);
//         let verifyQuery = `select * from users where email = '${req.query.email}' and activation_code = '${req.query.verifycode}'`
//         // console.log(verifyQuery);
//         db.query(verifyQuery, (err, result) => {
//             // console.log(result);
//             if (result.length == 0) {
//                 res.render('verifyToken', { email: req.body.email, err: "please enter valid verification code", expire: false })
//             }
//             else {

//                 let registerd_time = new Date(result[0].timestamp);
//                 let current = new Date()

//                 let diff = Math.abs(current - registerd_time)
//                 // console.log(diff)

//                 if (diff < 3600000) {

//                     // let activeUpdateQuery = `update users set active = '1' where email='${req.body.email}'`
//                     let activeUpdateQuery = `update users set active = '1' where email='${req.query.email}'`
//                     // console.log(activeUpdateQuery);
//                     db.query(activeUpdateQuery, (err, result) => {
//                         return res.render('./password/confirmPassword', { email: req.query.email, is_forgot: true })
//                     })
//                 }
//                 else {
//                     return res.render('verifyToken', { email: req.body.email, err: "activation code expired", expire: true })
//                 }

//             }
//         })
//     } catch (error) {
//         res.write("try again for verify")
//         return res.end()
//     }

// })

const welcome = (req, res) => {
    try {
        // let getdataQ = `select * from users where email='${req.query.email}'`
        let getdataQ = `select * from users`
        db.query(getdataQ, (err, result) => {
            // console.log(result);
            res.render('welcome', { msg: `Welcome ${result[0].first_name} ${result[0].last_name}` })
        })
    } catch (error) {
        return res.end("try again to login")
    }
}
// router.get('/welcome', authMiddleware,(req, res) => {
//     try {
//         // let getdataQ = `select * from users where email='${req.query.email}'`
//         let getdataQ = `select * from users`
//         db.query(getdataQ, (err, result) => {
//             // console.log(result);
//             res.render('welcome', { msg: `Welcome ${result[0].first_name} ${result[0].last_name}` })
//         })
//     } catch (error) {
//         return res.end("try again to login")
//     }
// })


module.exports = {forgot,verify_forgot_password,verifyUser,welcome}