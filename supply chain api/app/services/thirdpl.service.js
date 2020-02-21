const {contractThirdpl} = require('../../config/contract.config.js');

class ThirdplService {
     getThirdplByMetamask(metamask) {
         let data =[]
         return new Promise((resolve, reject) => contractThirdpl.methods.getThirdPL(metamask).call({})
            .then(dataThirdpl => {
                resolve({
                        data: dataThirdpl
                    })
                
            } )
            .catch(err => resolve({
                        data: data
                    })));
    }

}
module.exports = new ThirdplService()