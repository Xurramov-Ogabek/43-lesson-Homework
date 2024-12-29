const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

exports.registerUser = (req, res) => {
    const { username, password, fullName, age, email, gender } = req.body;

    if (!username || username.length < 3) {
        return res.status(400).send({ message: 'Username must be at least 3 characters long.' });
    }
    if (!password || password.length < 5) {
        return res.status(400).send({ message: 'Password must be at least 5 characters long.' });
    }
    if (!age || age < 10) {
        return res.status(400).send({ message: 'Age must be at least 10.' });
    }

    const newUser = { username, password, fullName, age, email, gender };
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send({ message: 'Error reading users file.' });
        const users = JSON.parse(data || '[]');
        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            return res.status(400).send({ message: 'Username or email already exists.' });
        }
        users.push(newUser);
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
            if (err) return res.status(500).send({ message: 'Error saving user.' });
            res.status(201).send({ message: 'User registered successfully.' });
        });
    });
};

exports.getUserProfile = (req, res) => {
    const { username, email } = req.query;
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send({ message: 'Error reading users file.' });
        const users = JSON.parse(data || '[]');
        const user = users.find(user => user.username === username || user.email === email);
        if (!user) return res.status(404).send({ message: 'User not found.' });
        res.status(200).send(user);
    });
};

exports.updateUserProfile = (req, res) => {
    const { username, password, fullName, age, email, gender } = req.body;
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send({ message: 'Error reading users file.' });
        const users = JSON.parse(data || '[]');
        const userIndex = users.findIndex(user => user.username === username || user.email === email);
        if (userIndex === -1) return res.status(404).send({ message: 'User not found.' });

        users[userIndex] = { username, password, fullName, age, email, gender };
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
            if (err) return res.status(500).send({ message: 'Error saving user.' });
            res.status(200).send({ message: 'User updated successfully.' });
        });
    });
};

exports.deleteUser = (req, res) => {
    const { username, email } = req.query;
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send({ message: 'Error reading users file.' });
        const users = JSON.parse(data || '[]');
        const userIndex = users.findIndex(user => user.username === username || user.email === email);
        if (userIndex === -1) return res.status(404).send({ message: 'User not found.' });

        users.splice(userIndex, 1);
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
            if (err) return res.status(500).send({ message: 'Error deleting user.' });
            res.status(200).send({ message: 'User deleted successfully.' });
        });
    });
};
