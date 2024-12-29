const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Blog yozuvi yaratish
router.post('/create', blogController.createBlog);

// Mavjud blog yozuvlarini ko'rish
router.get('/', blogController.getBlogs);

// Blog yozuvini yangilash
router.put('/', blogController.updateBlog);

// Blog yozuvini o'chirish
router.delete('/', blogController.deleteBlog);

module.exports = router;