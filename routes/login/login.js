const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require("bcrypt")
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const localStorage = require("localStorage")

const db = require('../../db')
const {authMiddleware,verifyLoginMiddleware}=require('../../midlleware/auth')

// router.get('/', verifyLoginMiddleware, (req, res) => {
//     try {
//         res.render('login', { err: '' })
//     } catch (error) {
//         return res.end("try again to login")
//     }
// })

// router.post('/login', (req, res) => {
//     try {
//         let password = req.body.password;
//         console.log(password);
//         let salt_keyquery = `select pw_salt from users_login where email='${req.body.email}'`
//         console.log(salt_keyquery);
//         db.query(salt_keyquery, (err, result) => {
//             console.log(result);
//             if (err) {
//                 let success = false
//                 return res.status(400).json({ success, err: err })
//             }
//             else {
//                 if (result == "") {
//                     return res.status(400).json({ success: false, err: err })
//                 }
//                 else {
//                     let salt_key = result[0].pw_salt;
//                     let encryptedPassword = md5(password + salt_key)

//                     let authQuery = `select * from users_login where email='${req.body.email}' and password='${encryptedPassword}'`
//                     // let authQuery = `select * from users_login where email='${req.body.email}' and password=` + password
//                     // let authQuery = `select * from users_login where  password=${password} and  email='${req.body.email}'`

//                     console.log("authQuery:" + authQuery);
//                     db.query(authQuery, (err, result) => {
//                         console.log("result" + JSON.stringify(result));

//                         if (err) res.end("enter valid email")
//                         else {
//                             if (result.length == 0) {
//                                 res.render('login', { err: "enter valid credentials" })
//                             }
//                             else {
//                                 let authToken = jwt.sign(req.body.email, process.env.TOKEN_SECRET);
//                                 // console.log(authToken);
//                                 localStorage.setItem("authToken",authToken);
//                                 res.redirect(`/welcome?email=${req.body.email}`)
//                             }
//                         }
//                     })

//                 }
//             }
//         })

//     } catch (error) {
//         return res.end("try again to login")
//         // return res.end()
//     }
// })
router.all('/loginform', verifyLoginMiddleware,(req,res) => {
  
    try {
        if(req.method == 'GET'){
            try {
             res.render('./login/login', { err: '' })
                 } catch (error) {
                      return res.end("try again to login")
                 }
        }
        else{
            try {
                let password = req.body.password;
                // console.log(password);
                let salt_keyquery = `select pw_salt from users_login where email='${req.body.email}'`
                // console.log(salt_keyquery);
                db.query(salt_keyquery, (err, result) => {
                    // console.log(result);
                    if (err) {
                        let success = false
                        return res.status(400).json({ success, err: err })
                    }
                    else {
                        if (result == "") {
                            return res.status(400).json({ success: false, err: err })
                        }
                        else {
                            let salt_key = result[0].pw_salt;
                            let encryptedPassword = md5(password + salt_key)
        
                            let authQuery = `select * from users_login where email='${req.body.email}' and password='${encryptedPassword}'`
                            // let authQuery = `select * from users_login where email='${req.body.email}' and password=` + password
                            // let authQuery = `select * from users_login where  password=${password} and  email='${req.body.email}'`
        
                            // console.log("authQuery:" , authQuery);
                            db.query(authQuery, (err, result) => {
                                // console.log("result" + JSON.stringify(result));
        
                                if (err) res.end("enter valid email")
                                else {
                                    if (result.length == 0) {
                                        res.render('login/login', { err: "enter valid credentials" })
                                    }
                                    else {
                                        let authToken = jwt.sign(req.body.email, process.env.TOKEN_SECRET);
                                        // console.log(authToken);
                                        localStorage.setItem("authToken",authToken);
                                        res.redirect(`/user/welcome`)
                                    }
                                }
                            })
        
                        }
                    }
                })
        
            } catch (error) {
                return res.end("try again to login")
                // return res.end()
            }
        }

    } catch (error) {
        return res.end("try again to login")
    }
})

module.exports = router