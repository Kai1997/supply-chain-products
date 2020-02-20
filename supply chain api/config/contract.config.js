const web3 =  require('./web3.config')
// var Web3 = require('web3');
// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
// var web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/cf658270146645bca881f8a7d4752099`));

require('dotenv').config('@.env')
const appConfig = require('./app.config')
const ABI = require('./abi.config')
const contract = new web3.eth.Contract(ABI.MainABI, "0x58F2231c5F758Af264a6F57dA3336008DA101c60",{});
module.exports = {
    contract
}
