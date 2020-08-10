const express = require('express')
const router = express.Router()
const {register, login, activation, token, forgotPassword, checkOtp, resetPassword} = require('../controllers/auth')
const {registrationValidator, loginValidator, activationValidator, forgotValidator, checkOtpValidator, resetValidator} = require('../middlewares/validation')

router
    .post('/register', registrationValidator, register)
    .post('/login', loginValidator, login)
    .post('/token', token)
    .post('/activation', activationValidator, activation)
    .post('/forgotpassword', forgotValidator, forgotPassword)
    .post('/checkotp', checkOtpValidator, checkOtp)
    .post('/resetpassword', resetValidator, resetPassword)
    .post('/resendotp', forgotValidator, forgotPassword)

module.exports = router;