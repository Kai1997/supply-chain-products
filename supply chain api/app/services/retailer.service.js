const {contractRetailer} = require('../../config/contract.config.js');

class RetailerService {
     getRetailerByMetamask(metamask) {
         let data =[]
         return new Promise((resolve, reject) => contractRetailer.methods.getRetailer(metamask).call({})
            .then(dataRetailer => {
                resolve({
                        data: dataRetailer
                    })
                
            } )
            .catch(err => resolve({
                        data: data
                    })));
    }

}
module.exports = new RetailerService()