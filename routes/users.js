const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Foydalanuvchi ro'yxatdan o'tishi
router.post('/register', userController.registerUser);

// Foydalanuvchi profili
router.get('/', userController.getUserProfile);
router.put('/', userController.updateUserProfile);
router.delete('/', userController.deleteUser);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // Foydalanuvchi ro'yxatdan o'tkazish uchun route
// router.post('/', userController.registerUser);

// module.exports = router;