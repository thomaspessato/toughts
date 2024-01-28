const express = require('express');
const authController = require('../controllers/AuthController');
const router = express.Router();

router.get('/login', authController.login);
router.get('/register', authController.register);

router.post('/login', authController.loginPost);
router.post('/register', authController.registerPost);

router.get('/logout', authController.logout);

module.exports = router;
