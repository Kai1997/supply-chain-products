const SupplychainService = require('../../services/supplychain.service');
// const contract = require('../../../config/contract.config')

class SupplychainController {
    async getInfoProduct(req, res, next) {
        SupplychainService.getInfoProduct(req.query.upc)
            .then((success) => res.json(success))
            .catch(err => next(err));
    }
}
module.exports = new SupplychainController()

