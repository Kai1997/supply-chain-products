const Web3 =  require('web3')
require('dotenv').config('@.env')
const appConfig = require('./app.config')

const infuraKey = appConfig.infura.key 
const rpcURL = `https://ropsten.infura.io/v3/${infuraKey}`; 

module.exports = new Web3(new Web3.providers.HttpProvider(rpcURL));
