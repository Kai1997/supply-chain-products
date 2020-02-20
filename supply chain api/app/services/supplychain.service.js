const mongoose = require('mongoose'),
    constants = require('../../common/constants'),
    MessageConstants = constants.MessageConstants,
    {contract} = require('../../config/contract.config.js'),
    appConfig = require('../../config/app.config')

class SupplychainService {
     getInfoProduct(upc) {
         return new Promise((resolve, reject) => contract.methods.getProductInfo(upc).call({
            })
            .then(productInfo => {
                resolve(productInfo)
            } )
            .catch(err => reject(err)));
    }

}
module.exports = new SupplychainService()