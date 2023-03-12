const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.handleLogin);
router.get('/refresh', authController.handleRefreshToken);
router.get('/logout', authController.handleLogout);

module.exports = router;