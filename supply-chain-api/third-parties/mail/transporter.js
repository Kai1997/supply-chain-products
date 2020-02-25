const nodemailer = require('nodemailer')
const appConfig = require('../../config/app.config')

const { FORGOT_PASSWORD } = require('./types')
const { geForgotPasswordOption } = require('./options')

const transporterConfig = {
    host: appConfig.mail.HOST,
    port: appConfig.mail.PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: appConfig.mail.USERNAME, // generated ethereal user
        pass: appConfig.mail.PASSWORD // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(transporterConfig)

module.exports = (type) => {
    return {
        sendMail: (data) => {
            switch (type) {
            case FORGOT_PASSWORD: return transporter.sendMail(geForgotPasswordOption(data))
            default: throw new Error(`We have not support ${type} mail form`)
            }
        }
    }
}
