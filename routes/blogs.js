const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/create', blogController.createBlog);
router.get('/', blogController.getBlogs);

router.put('/', blogController.updateBlog);

router.delete('/', blogController.deleteBlog);

module.exports = router;