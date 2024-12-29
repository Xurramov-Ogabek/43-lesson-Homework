const fs = require('fs');
const path = require('path');
const blogsFilePath = path.join(__dirname, '../data/blogs.json');

// Yangi blog yozuvi yaratish (POST)
exports.createBlog = (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
        return res.status(400).send({ message: 'Title, content, and author are required.' });
    }

    const newBlog = { id: Date.now().toString(), title, content, author };
    fs.readFile(blogsFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send({ message: 'Error reading blogs file.' });
        const blogs = JSON.parse(data || '[]');
        blogs.push(newBlog);
        fs.writeFile(blogsFilePath, JSON.stringify(blogs), (err) => {
            if (err) return res.status(500).send({ message: 'Error saving blog.' });
            res.status(201).send({ message: 'Blog created successfully.' });
        });
    });
};

// Mavjud blog yozuvlarini ko'rish (GET)
exports.getBlogs = (req, res) => {
    fs.readFile(blogsFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send({ message: 'Error reading blogs file.' });
        const blogs = JSON.parse(data || '[]');
        res.status(200).send(blogs);
    });
};

// Blog yozuvini yangilash (PUT)
exports.updateBlog = (req, res) => {
    const { id, title, content, author } = req.body;
    fs.readFile(blogsFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send({ message: 'Error reading blogs file.' });
        const blogs = JSON.parse(data || '[]');
        const blogIndex = blogs.findIndex(blog => blog.id === id);
        if (blogIndex === -1) return res.status(404).send({ message: 'Blog not found.' });

        blogs[blogIndex] = { id, title, content, author };
        fs.writeFile(blogsFilePath, JSON.stringify(blogs), (err) => {
            if (err) return res.status(500).send({ message: 'Error updating blog.' });
            res.status(200).send({ message: 'Blog updated successfully.' });
        });
    });
};

// Blog yozuvini o'chirish (DELETE)
exports.deleteBlog = (req, res) => {
    const { id } = req.query;
    fs.readFile(blogsFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send({ message: 'Error reading blogs file.' });
        const blogs = JSON.parse(data || '[]');
        const blogIndex = blogs.findIndex(blog => blog.id === id);
        if (blogIndex === -1) return res.status(404).send({ message: 'Blog not found.' });

        blogs.splice(blogIndex, 1);
        fs.writeFile(blogsFilePath, JSON.stringify(blogs), (err) => {
            if (err) return res.status(500).send({ message: 'Error deleting blog.' });
            res.status(200).send({ message: 'Blog deleted successfully.' });
        });
    });
};