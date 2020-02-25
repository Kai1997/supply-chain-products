const CustomerService = require('../../services/user.service');
const fileService = require('../../services/file.service');

class CustomerController {
    async getUserAll(req, res) {
        CustomerService.getAll()
            .then((success) => res.json(success))
            .catch(err => next(err));
    }

    async addDeviceToken(req, res, next) {
        CustomerService.addDeviceToken(req.body.id, req.body)
            .then((success) => res.json(success))
            .catch(err => next(err));
    }

    async getUserById(req, res) {
        const user = await CustomerService.getById(req.body.id);
        res.json(user)
    }

    async uploadImge(req, res, next) {
        fileService.uploadFile(req).then(file => {
            res.json(file);
        }).catch(err => next(err));
    }

    async updateUser(req, res) {
        CustomerService.updateInfo(req.body.id, req.body.userInf).then(data => {
            res.json(data)
        })
    }

    async checkPassword(req, res) {
        CustomerService.checkPassword(req.body.id, req.query.password).then(data => {
            res.json(data);
        })
    }

    async checkUserNameExist(req, res) {
        CustomerService.checkUserNameExist(req.query.username).then(data => {
            res.json(data);
        })
    }

    async checkMetamask(req, res) {
        CustomerService.checkMetamask(req.query.metamask).then(data => {
            res.json(data);
        })
    }

    async checkCodeResetPassword(req, res) {
        CustomerService.checkCodeResetPassword(req.query.username, req.query.code).then(data => {
            res.json(data);
        })
    }

    async updatePassword(req, res) {
        CustomerService.updatePassword(req.body.id, req.body.newPassword, req.body.oldPassword).then(data => {
            res.json(data)
        })
    }

    async resetPassword(req, res) {
        CustomerService.resetPassword(req.body.username, req.body.newPassword, req.body.code).then(data => {
            res.json(data)
        })
    }
}
module.exports = new CustomerController()

