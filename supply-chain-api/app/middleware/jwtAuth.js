const { pareJwtToken } = require('@utils/jwt')
const { sendError } = require('@utils/responses')
const usersService = require('../services/user.service')
const appConfig = require('../../config/app.config')

const { REQUEST_STATUSES: { UNAUTHORIZED } } = require('../../common/constants')

module.exports = (pareJwtTokenOptions) => (req, res, next) => {
    Promise.resolve()
        .then(_ => {
            if (req.headers &&
                req.headers.authorization &&
                req.headers.authorization.split(' ')[0] === appConfig.jwt.JWT_TOKEN_PREFIX
            ) {
                return Promise.resolve()
            } else return Promise.reject()
        })
        .then(_ => {
            const accessToken = req.headers.authorization.split(' ')[1]
            try {
                const userDecoded = pareJwtToken(accessToken, { ignoreExpiration: pareJwtTokenOptions.ignoreExpiration || false })
                return userDecoded ? Promise.resolve(userDecoded) : Promise.reject()
            } catch (err) {
                return Promise.reject()
            }
        })
        .then(userDecoded => {
            return usersService.getUserById(userDecoded.userId)
                .then(user => {
                    req.userAuth = user.toJSON()
                    return Promise.resolve()
                })
        })
        .then(_ => next())
        .catch(err => {
            sendError(res, {
                errors: err ? [{ description: err.message }] : [{ description: 'Unauthorized user!' }],
                status: UNAUTHORIZED
            })
        })
}
