const express = require('express')
const router = express.Router()
const localStorage = require("localStorage")

const logout = (req, res) => {
  
    try {
       localStorage.clear()
       res.redirect('/login/loginform')
    } catch (error) {
        return res.end("try again to logout")
    }
}

module.exports = {logout}