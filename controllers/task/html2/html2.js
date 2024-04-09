const express = require('express')

const html2 = (req, res) => {
    try {
        res.render('html2/index')
    } catch (error) {
        return res.end("try again to welcome")
    }
}

module.exports = {html2}