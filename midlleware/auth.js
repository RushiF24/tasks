const localStorage = require("localStorage")
const jwt = require('jsonwebtoken');
const JWT_SECERET = process.env.TOKEN_SECRET


const authMiddleware = async (req, res, next) => {
    const authHeader = localStorage.getItem("authToken")
    console.log('auth', authHeader);

    if (authHeader) {
        jwt.verify(authHeader, JWT_SECERET, (err, payload) => {
            console.log("payload",payload);
            if (err) {
                res.render('login', { err: "not authorized" })
            }
            next();
        })
    }
    else {
        res.render('login', { err: "not authorized" })
    }
}

//check if user is not logged in(if yes then redirect to login or register pages)
const verifyLoginMiddleware = async (req,res,next) => {
    const authHeader = localStorage.getItem("authToken")
    if (authHeader == null) {
            next();
    }
    else {
        res.redirect('/user/welcome')
    }
}

module.exports = { authMiddleware,verifyLoginMiddleware }