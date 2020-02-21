const {contractFarmer} = require('../../config/contract.config.js');
   
class FarmerService {
     getFarmerByMetamask(metamask) {
         let data =[]
         return new Promise((resolve, reject) => contractFarmer.methods.getFammer(metamask).call({})
            .then(dataFarmer => {
                resolve({
                        data: dataFarmer
                    })
                
            } )
            .catch(err => resolve({
                        data: data
                    })));
    }

}
module.exports = new FarmerService()