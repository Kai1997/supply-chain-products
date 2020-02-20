const Router = require('express').Router();
const SupplychainController = require('../../app/controllers/api/supplychain.controller');

Router.get('/getInfoProduct', SupplychainController.getInfoProduct) 

module.exports = Router;