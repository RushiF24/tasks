const express = require('express')
const router = express.Router()
const db = require('../../../db')


const posts = (req, res) => {
    try {
        res.render('jsonplaceholder/allPosts')
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
}

const postsID = (req, res) => {
    try {
        res.render('jsonplaceholder/postDetail',{id: req.params.id})
    }
    catch (error) {
        res.write("Try again")
        return res.end()
    }
}

module.exports = {posts,postsID}
