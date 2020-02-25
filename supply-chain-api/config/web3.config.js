const Web3 =  require('web3')
require('dotenv').config('@.env')
const appConfig = require('./app.config')

const rpcURL = appConfig.infura.url ; 

module.exports = new Web3(new Web3.providers.HttpProvider(rpcURL));

