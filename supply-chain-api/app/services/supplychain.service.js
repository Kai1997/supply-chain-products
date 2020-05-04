const mongoose = require('mongoose'),
    constants = require('../../common/constants'),
    MessageConstants = constants.MessageConstants,
    {contractMain} = require('../../config/contract.config.js'),
    FarmerService = require('./farmer.service'),
    ManuService = require('./manufacturer.service'),
    DistriService = require('./distributor.service'),
    ThirdplService = require('./thirdpl.service'),
    RetailerService = require('./retailer.service'),
    appConfig = require('../../config/app.config')

class SupplychainService {
     getInfoProduct(upc) {
         let data =[]
         let originFarmerID =[]
         let manufacturerID =[]
         let distributorID =[]
         let thirdPLID =[]
         let retailerID =[]

         return new Promise((resolve, reject) => contractMain.methods.getProductInfo(upc).call({})
            .then(productInfo => {
                if (productInfo && productInfo["0"] !== "") {
                    contractMain.methods.getProductAddress(upc).call({})
                    .then(async productAddress => {
                        
                        await FarmerService.getFarmerByMetamask(productAddress["1"]).then(data =>{
                            originFarmerID = data;
                        });
                        await ManuService.getManuByMetamask(productAddress["4"]).then(data =>{
                            manufacturerID = data;
                        });
                        await DistriService.getDistriByMetamask(productAddress["2"]).then(data =>{
                            distributorID = data;
                        });
                        await ThirdplService.getThirdplByMetamask(productAddress["5"]).then(data =>{
                            thirdPLID = data;
                        });
                        await RetailerService.getRetailerByMetamask(productAddress["3"]).then(data =>{
                            retailerID = data;
                        });
                        let info = {
                            upc: upc,
                            productId: productInfo["0"],
                            productNotes: productInfo["1"],
                            productPrice: productInfo["2"],
                            productState: productInfo["3"],
                            productImg: productInfo["4"],
                            ownerID: productAddress["0"],
                            actor: [
                            	 originFarmerID,
	                            manufacturerID,
	                            distributorID,
	                            thirdPLID,
	                            retailerID,
	                            
                            ]
                           
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