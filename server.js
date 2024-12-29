const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');

app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});