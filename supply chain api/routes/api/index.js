const router = require('express').Router()
const oauthRoute = require('./oauth.route.api')
const customerRoute = require('./customer.route.api')
const testRoute = require('./test')

router.use('/oauth', oauthRoute)

router.use('/test', testRoute)

router.use('/customer', customerRoute)

module.exports = router
