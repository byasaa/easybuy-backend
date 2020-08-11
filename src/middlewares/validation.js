const {validator} = require('../helpers/validator')
const {response} = require('../helpers/response')

module.exports = {
    address : (req, res, next) => {
        const validationRule = {
            "address_as": "required|string",
            "fullname": "required|string",
            "address": "required|string",
            "city": "required|string",
            "zip_code": "required|numeric",
            "telp": "required|string",
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
    product : (req, res, next) => {
        console.log(req.body);
        const validationRule = {
            "name": "required|string",
            "brand_id": "required",
            "category_id": "required",
            "description": "required|string",
            "price": "required",
            "color": "required",
            "size": "required",
            "rating": "required",
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
            "birthday": "required",
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