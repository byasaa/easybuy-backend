const {validator} = require('../helpers/validator')
const {response} = require('../helpers/response')

module.exports = {
    address : (req, res, next) => {
        const validationRule = {
            "address": "required|string",
        }
        validator(req.body, validationRule, {}, (err, status) => {
            if(!status) {
                return response(res, 'fail', err, 412)
            } else {
                console.log(status)
                next()
            }
        })
    },
    registrationValidator : (req, res, next) => {
        const validationRule = {
            "email": "required|email",
            "name": "required|string",
            "password": "required|string|min:6",
        }
        validator(req.body, validationRule, {}, (err, status) => {
            if(!status) {
                return response(res, 'fail', err, 412)
            } else {
                console.log(status)
                next()
            }
        })
    },
    loginValidator : (req, res, next) => {
        const validationRule = {
            "email": "required|email",
            "password": "required|string",
        }
        validator(req.body, validationRule, {}, (err, status) => {
            if(!status) {
                return response(res, 'fail', err, 412)
            } else {
                console.log(status)
                next()
            }
        })
    },
    activationValidator : (req, res, next) => {
        const validationRule = {
            "email": "required|email",
            "code": "required|min:6|max:6|numeric",
        }
        validator(req.body, validationRule, {}, (err, status) => {
            if(!status) {
                return response(res, 'fail', err, 412)
            } else {
                console.log(status)
                next()
            }
        })
    },
    checkOtpValidator : (req, res, next) => {
        const validationRule = {
            "code": "required|numeric",
        }
        validator(req.body, validationRule, {}, (err, status) => {
            if(!status) {
                return response(res, 'fail', err, 412)
            } else {
                console.log(status)
                next()
            }
        })
    },
    forgotValidator : (req, res, next) => {
        const validationRule = {
            "email": "required|email",
        }
        validator(req.body, validationRule, {}, (err, status) => {
            if(!status) {
                return response(res, 'fail', err, 412)
            } else {
                console.log(status)
                next()
            }
        })
    },
    resetValidator : (req, res, next) => {
        const validationRule = {
            "email": "required|email",
            "password": "required|string|min:6",
        }
        validator(req.body, validationRule, {}, (err, status) => {
            if(!status) {
                return response(res, 'fail', err, 412)
            } else {
                console.log(status)
                next()
            }
        })
    },
    changeValidator : (req, res, next) => {
        const validationRule = {
            "oldPassword": "required",
            "newPassword": "required|string|min:6",
        }
        validator(req.body, validationRule, {}, (err, status) => {
            if(!status) {
                return response(res, 'fail', err, 412)
            } else {
                console.log(status)
                next()
            }
        })
    }
}