const jwt = require('jsonwebtoken')
const config = require('../configs/')
const {response} = require('../helpers/response')

module.exports = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization
        try {
            const decoded = jwt.verify(token, config.secretKey)
            req.decodedToken = decoded
            next()
        } catch (error) {
            console.log(error.name)
            if (error.name === 'TokenExpiredError') {
                return response(res, 'Fail', 'Token expired', 401)
            } else if (error.name === 'JsonWebTokenError') {
                return response(res, 'Fail', 'Invalid Token', 401)
            } else {
                return response(res, 'Fail', 'Invalid user Token', 401)
            }
        }
    }
}