const {contractManu} = require('../../config/contract.config.js');

class ManuService {
     getManuByMetamask(metamask) {
         let data =[]
         return new Promise((resolve, reject) => contractManu.methods.getManufacturer(metamask).call({})
            .then(dataManu => {
                resolve({
                        data: dataManu
                    })
                
            } )
            .catch(err => resolve({
                        data: data
                    })));
    }

}
module.exports = new ManuService()