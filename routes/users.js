const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);

router.get('/', userController.getUserProfile);
router.put('/', userController.updateUserProfile);
router.delete('/', userController.deleteUser);

module.exports = router;
