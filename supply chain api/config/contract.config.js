const web3 =  require('./web3.config')
require('dotenv').config('@.env')
const appConfig = require('./app.config')

module.exports = (contractName) => new Promise((resolve, reject) => {
    //const contract =  new web3.eth.Contract(appConfig.contract[contractName].abi, appConfig.contract[contractName].address,{ gasPrice: appConfig.contract.gasPrice });
    // resolve(contract)
})
