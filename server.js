const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');

// Routes uchun middleware
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});