const express = require('express')
const router = express.Router()
const {register, login, activation, token} = require('../controllers/auth')

router
    .post('/register', register)
    .post('/login', login)
    .post('/token', token)
    .post('/activation', activation)

module.exports = router;