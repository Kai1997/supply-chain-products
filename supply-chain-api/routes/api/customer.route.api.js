const Router = require('express').Router();
const AuthController = require('../../app/controllers/api/auth.controller');
const CustomerController = require('../../app/controllers/api/customer.controller');

Router.get('/all', CustomerController.getUserAll); //
Router.get('/logout', AuthController.authorizeServiceUser, AuthController.logout); //
Router.post('/deviceToken/add', AuthController.authorizeServiceUser, CustomerController.addDeviceToken);

Router.get('/password', AuthController.authorizeServiceUser, CustomerController.checkPassword)
Router.get('/username', AuthController.authorizeServiceUser, CustomerController.checkUserNameExist)
Router.get('/code', CustomerController.checkCodeResetPassword)
Router.post('/password', AuthController.authorizeServiceUser, CustomerController.updatePassword)
Router.get('/', AuthController.authorizeServiceUser, CustomerController.getUserById);
Router.post('/', AuthController.authorizeServiceUser, CustomerController.updateUser)
Router.post('/password/reset', CustomerController.resetPassword);
Router.post('/image/upload', CustomerController.uploadImge);

// router.get('/getInfoProduct', customerController.getInfoProduct) 

module.exports = Router;