const express = require('express')
const router = express.Router()
const db = require('../../../db')
const controller = require("../../../controllers/task/jsonplaceholder/jsonplaceholder")

router.get('/posts', controller.posts)

router.get('/posts/:id', controller.postsID)

module.exports = router
