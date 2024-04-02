const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const bcrypt = require("bcrypt")
const md5 = require('md5');
const {authMiddleware,verifyLoginMiddleware}=require('../../midlleware/auth')

const db = require('../../db')
router.get('/',verifyLoginMiddleware,(req, res) => {
        // console.log(db);
        // res.render('timezone')
        res.render('./registration/registration_form', { err: '' })
})
router.post('/register' ,(req, res) => {

    try {
        let activation_code = crypto.randomBytes(12).toString('hex')
        // inserting data into database
        // console.log(activation_code);
        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'rushikesh.falak.2024@gmail.com',
        //         pass: `${process.env.APP_PASSWORD}`
        //     }
        // });

        // var mailOptions = {
        //     from: 'rushikesh.falak.2024@gmail.com',
        //     to: req.body.email,
        //     subject: 'Account Activation Code',
        //     text: `
        //     Hi ${req.body.firstname} ${req.body.lastname}
        //     Your Account Activation code is ${activation_code}`,

        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         res.status(500).json("error:" + error);
        //     } else {
        //         res.status(200).json('Email sent: ' + info.response);
        //     }
        // });

        let insertUserQuery = `insert into users (first_name,last_name,email,activation_code) values ('${req.body.firstname}', '${req.body.lastname}','${req.body.email}','${activation_code}')`

        db.query(insertUserQuery, (err, result) => {
            if (err) {
                res.render('./registration/registration_form', { err: 'user already exist' });

            } else {
                console.log("My SQL Connected via a new open connection.");
                res.render('./registration/verify', { email: req.body.email, err: '', code: activation_code, expire: false })
                res.end()
            }
        });

    }
    catch (error) {
        res.write("Try again for register")
        return res.end()
    }
})
router.get('/verify', (req, res) => {
    try {
        // console.log(req.query.email, req.query.verifycode);
        let code= req.query.verifycode;
        let verifyQuery = `select * from users where email = '${req.query.email}' and activation_code = '${req.query.verifycode}'`
        // console.log(verifyQuery);
        db.query(verifyQuery, (err, result) => {
            // console.log('verify res',result);
            if (result.length == 0) {
                res.render('./registration/verify', { email: req.query.email, err: "please enter valid verification code",code:code, expire: false })
            }
            else {

                let registerd_time = new Date(result[0].timestamp);
                let current = new Date()

                let diff = Math.abs(current - registerd_time)
                // console.log(diff)

                if (diff < 3600000) {

                    let activeUpdateQuery = `update users set active = '1' where email='${req.query.email}'`
                    // let activeUpdateQuery = `update users set active = '1' where email='${req.body.email}`
                    // console.log('dfrt', activeUpdateQuery);
                    db.query(activeUpdateQuery, (err, result) => {
                        return res.render('./password/confirmPassword', { email: req.query.email, is_forgot: false })
                    })
                }
                else {
                    return res.render('./registration/verify', { email: req.query.email, err: "activation code expired", code:code,expire: true })
                }

            }
        })
    } catch (error) {
        res.write("try again for verify")
        return res.end()
    }
})

router.post('/activation_code', (req, res) => {
    try {
        // console.log(req.body);
        let activation_code = crypto.randomBytes(12).toString('hex')
        let activation_updateQ = `update users set activation_code = '${activation_code}' where email='${req.body.email}';`
        // console.log(activation_updateQ);
        db.query(activation_updateQ, (err, result) => {
            if (err) throw err
            return res.status(200).json({ activation_code: activation_code });
            // res.render('verify',{email:req.body.email,err:'your activation code is updated',expire:false})
            // console.log(result);
        })

    }
    catch (error) {

    }

})

router.post('/createPassword', async (req, res) => {
    try {
        let password = req.body.password;
        let salt_key = await bcrypt.genSalt(10)
        let encryptedPassword = md5(password + salt_key)

        let insertLogin = `insert into users_login (email,password,pw_salt) values ('${req.body.email}', '${encryptedPassword}', '${salt_key}')`
        // console.log('insert login query', insertLogin);
        db.query(insertLogin, (err, result) => {
            res.redirect('/login/loginform')
        })

    } catch (error) {
        res.write("try again to verify")
        return res.end()
    }
})


module.exports = router