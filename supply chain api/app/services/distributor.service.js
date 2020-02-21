const {contractDistri} = require('../../config/contract.config.js');

class DistriService {
     getDistriByMetamask(metamask) {
         let data =[]
         return new Promise((resolve, reject) => contractDistri.methods.getDistributor(metamask).call({})
            .then(dataDistri => {
                resolve({
                        data: dataDistri
                    })
                
            } )
            .catch(err => resolve({
                        data: data
                    })));
    }

}
module.exports = new DistriService()