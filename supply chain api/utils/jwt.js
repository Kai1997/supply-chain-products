const jwt = require('jsonwebtoken')
const uid = require('rand-token').uid

const appConfig = require('../config/app.config')


const randRefreshToken = (len = 45) => uid(len)

const jwtToken = (data = {}) => {
    return jwt.sign(data, appConfig.jwt.JWT_ENCRYPTION, { expiresIn: appConfig.jwt.JWT_EXPIRATION })
}

const pareJwtToken = (token, options = {}) => {
    return jwt.verify(token, appConfig.jwt.JWT_ENCRYPTION, { ...options })
}

module.exports = {
    jwtToken,
    pareJwtToken,
    randRefreshToken
}
