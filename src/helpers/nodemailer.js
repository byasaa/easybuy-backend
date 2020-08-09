const nodemailer = require('nodemailer');
const {email} = require('../configs')

module.exports = {
    sendOtp: (data) => {
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user: email.user,
                pass: email.pass,
            }
        })
        const options = {
            from: `Kehidupan ${email.user}`,
            to: data.email,
            subject: "OTP",
            text: "Batas 30 Menit",
            html: `<p>${data.code}</p>`
        }
        transporter.sendMail(options, (err, result) => {
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
        })
    }
}