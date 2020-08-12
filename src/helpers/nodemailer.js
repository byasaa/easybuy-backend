const nodemailer = require('nodemailer')
const {
    email
} = require('../configs')
const mustache = require('mustache')
const fs = require('fs')

module.exports = {
    sendOtp: (data) => {
        const templateEmail = fs.readFileSync('./src/helpers/index.html', {
            encoding: 'utf-8',
        })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email.user,
                pass: email.pass,
            },
        })
        const options = {
            from: `Secure EasyBuy ${email.user}`,
            to: data.email,
            subject: data.subject,
            html: mustache.render(templateEmail, data),
        }
        transporter.sendMail(options, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
        })
    },
}