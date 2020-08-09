const {response} = require('../helpers/response')
const {register, insertOtp, loginByEmail, getOtp, activingUser} = require('../models/auth')
const {
    genSaltSync,
    hashSync,
    compareSync,
} = require('bcrypt')
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const {secretKey, refreshKey} = require('../configs')
const {sendOtp} = require('../helpers/nodemailer');


module.exports = {
    register: async (req, res) => {
        let otpCode = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        const setData = req.body
        const salt = genSaltSync(10)
        setData.password = hashSync(setData.password, salt)
        setData.is_active = 0
        try {
            const result = await register(setData)
            const now = new Date()

            setOtp = {
                email: result.email,
                code: otpCode,
                expired_at: new Date(now.setMinutes(now.getMinutes() + 30)),
            }
            await insertOtp(setOtp)
            await sendOtp(setOtp)

            return response(res, 'success', result, 201)
        } catch (error) {
            console.log(error)
            return response(res, 'Failed', 'Internal server Error', 500)
        }
    },
    activation: async (req, res) => {
        const setData = {
            email: req.body.email,
            code: req.body.code,
        }
        try {
            const otp = await getOtp(setData)
            if (otp[0].code == setData.code) {
                if (otp[0].expired_at > new Date()) {
                    const result = await activingUser(setData.email)
                    // TO DO delete otp in database
                    return response(res, 'success', result, 200)
                } else {
                    return response(res, 'Failed', 'OTP is Expired', 500)
                }
            }
            return response(res, 'Failed', 'OTP code not same', 500)
        } catch (error) {
            
        }
    },
    login: async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        try {
            const result = await loginByEmail(email)
            if(result[0].is_active == 1) {
                const user = result[0]
                const checkPass = compareSync(password, user.password)
                if (checkPass) {
                    delete user.password
                    const token = jwt.sign({
                        user: user
                    }, secretKey, {
                        expiresIn: '1d',
                    })
                    const refreshToken = jwt.sign({
                        user: user
                    }, refreshKey, {
                        expiresIn: '2d'
                    })
                    result[0].token = token
                    result[0].refreshToken = refreshToken
                    return response(res, 'success', result, 200)
                }
            } else {
                let otpCode = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
                const now = new Date()

                setOtp = {
                    email: result[0].email,
                    code: otpCode,
                    expired_at: new Date(now.setMinutes(now.getMinutes() + 30)),
                }
                await insertOtp(setOtp)
                await sendOtp(setOtp)
                return response(res, 'fail', 'Please Active Your Email', 504)
            }
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Internal server Error', 500)
        }
    },
    // forgotPassword: {

    // },
    token: (req, res) => {
        try {
            const refreshToken = req.body.token
            jwt.verify(refreshToken, refreshKey, (error, decoded) => {
                if (error) return response(res, 'fail', error.name, 403)
                const accessToken = jwt.sign({
                    user: decoded.user
                }, secretKey, {
                    expiresIn: '1h'
                })
                const refreshToken = jwt.sign({
                    user: decoded.user
                }, refreshKey, {
                    expiresIn: '1d'
                })
                return response(res, 'success', {
                    token: accessToken,
                    refreshToken: refreshToken
                }, 200)
            })
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'internal server error', 403)
        }
    }
}