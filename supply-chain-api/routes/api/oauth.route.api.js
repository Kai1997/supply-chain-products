const { jwtAuth } = require('@middleware/index')

const router = require('express').Router(),
    authController = require('../../app/controllers/api/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/checkUsername', authController.checkUsername);
router.get('/verify', authController.verify)
router.get('/token/verify', authController.verifyToken);
// router.post('/token', jwtAuth({ ignoreExpiration: true }), authController.getAccessToken) // get accessToken by refreshToken

module.exports = router;