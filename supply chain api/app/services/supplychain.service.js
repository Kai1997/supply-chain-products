const mongoose = require('mongoose'),
    constants = require('../../common/constants'),
    MessageConstants = constants.MessageConstants,
    {contract} = require('../../config/contract.config.js'),
    appConfig = require('../../config/app.config')

class SupplychainService {
     getInfoProduct(upc) {
         let data =[]
         return new Promise((resolve, reject) => contract.methods.getProductInfo(upc).call({})
            .then(productInfo => {
                if (productInfo["0"] !== "") {
                    contract.methods.getProductAddress(upc).call({})
                    .then(productAddress => {
                        let info = {
                            upc: upc,
                            productId: productInfo["0"],
                            productNotes: productInfo["1"],
                            productPrice: productInfo["2"],
                            productState: productInfo["3"],
                            ownerID: productAddress["0"],
                            originFarmerID: productAddress["1"],
                            distributorID: productAddress["2"],
                            manufacturerID: productAddress["4"],
                            thirdPLID: productAddress["5"],
                            retailerID: productAddress["3"],
                        }
                        resolve({
                            status: true,    
                            data: [...data, info]
                        })
                    })
                    .catch(err => resolve({
                        status: false,
                        data: MessageConstants.ProductNotFound
                    }))
                } else {
                    resolve({
                        status: false,
                        data: MessageConstants.ProductNotFound
                    })
                }
                
            } )
            .catch(err => resolve({
                        status: false,
                        data: MessageConstants.ProductNotFound
                    })));
    }

}
module.exports = new SupplychainService()