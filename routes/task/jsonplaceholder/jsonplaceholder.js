const express = require('express')
const router = express.Router()
const db = require('../../../db')


router.get('/posts', (req, res) => {
    try {
        res.render('jsonplaceholder/allPosts')
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})

router.get('/posts/:id', (req, res) => {
    try {
        res.render('jsonplaceholder/postDetail',{id: req.params.id})
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
})

module.exports = router
