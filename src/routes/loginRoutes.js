const express = require('express')
const router = express.Router()
const { loginEmployed } = require('../controllers/loginController')

router.get('/login', loginEmployed)

module.exports = router
