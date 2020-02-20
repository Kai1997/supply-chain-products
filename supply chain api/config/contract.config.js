const web3 =  require('./web3.config')
require('dotenv').config('@.env')
const appConfig = require('./app.config')
const ABI = require('./abi.config')

const contract = new web3.eth.Contract(ABI.MainABI, "0x58F2231c5F758Af264a6F57dA3336008DA101c60",{});
module.exports = {
    contract
}
