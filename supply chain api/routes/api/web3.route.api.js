const router = require('express').Router()

// controllers
const web3Controller = require('@controllers/api/web3Controller')


router.post('/getweb3', web3Controller.getData) 

module.exports = router
