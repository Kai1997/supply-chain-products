const router = require('express').Router()
const oauthRoute = require('./oauth.route.api')
const customerRoute = require('./customer.route.api')
const supplyRoute = require('./supplychain.route.api')
const testRoute = require('./test')

router.use('/oauth', oauthRoute)

router.use('/test', testRoute)

router.use('/customer', customerRoute)

router.use('/supply', supplyRoute)

module.exports = router
