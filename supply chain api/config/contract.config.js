const web3 =  require('./web3.config')
require('dotenv').config('@.env')
const appConfig = require('./app.config')
const ABI = require('./abi.config')

const contractMain = new web3.eth.Contract(ABI.MainABI, appConfig.contract.address.main,{ gasPrice: appConfig.contract.gasPrice});
const contractOwn = new web3.eth.Contract(ABI.OwnableABI, appConfig.contract.address.ownable,{ gasPrice: appConfig.contract.gasPrice});
const contractFarmer = new web3.eth.Contract(ABI.FarmerABI, appConfig.contract.address.farmer,{ gasPrice: appConfig.contract.gasPrice});
const contractAdmin = new web3.eth.Contract(ABI.AdminABI, appConfig.contract.address.admin,{ gasPrice: appConfig.contract.gasPrice});
const contractManu = new web3.eth.Contract(ABI.ManufactorABI, appConfig.contract.address.manu,{ gasPrice: appConfig.contract.gasPrice});
const contractDistri = new web3.eth.Contract(ABI.DistributerABI, appConfig.contract.address.distri,{ gasPrice: appConfig.contract.gasPrice});
const contractThirdpl = new web3.eth.Contract(ABI.ThirdPLABI, appConfig.contract.address.thirdpl,{ gasPrice: appConfig.contract.gasPrice});
const contractRetailer = new web3.eth.Contract(ABI.RetailerABI, appConfig.contract.address.retailer,{ gasPrice: appConfig.contract.gasPrice});
const contractCustomer = new web3.eth.Contract(ABI.ConsumerABI, appConfig.contract.address.customer,{ gasPrice: appConfig.contract.gasPrice});
console.log(contractRetailer)
module.exports = {
    contractMain,
    contractOwn,
    contractFarmer,
    contractAdmin,
    contractManu,
    contractDistri,
    contractThirdpl,
    contractRetailer,
    contractCustomer
}
