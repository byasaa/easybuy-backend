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
    }
}