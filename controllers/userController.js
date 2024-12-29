const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

// Foydalanuvchini ro'yxatdan o'tkazish (POST)
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
    // User ma'lumotlari
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

// Foydalanuvchi profilini ko'rish (GET)
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

// Foydalanuvchi ma'lumotlarini yangilash (PUT)
exports.updateUserProfile = (req, res) => {
    const { username, password, fullName, age, email, gender } = req.body;
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send({ message: 'Error reading users file.' });
        const users = JSON.parse(data || '[]');
        const userIndex = users.findIndex(user => user.username === username || user.email === email);
        if (userIndex === -1) return res.status(404).send({ message: 'User not found.' });

        // Foydalanuvchi malumotlarini yangilash
        users[userIndex] = { username, password, fullName, age, email, gender };
        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
            if (err) return res.status(500).send({ message: 'Error saving user.' });
            res.status(200).send({ message: 'User updated successfully.' });
        });
    });
};

// Foydalanuvchini o'chirish (DELETE)
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

// const fs = require('fs');
// const path = require('path');

// const usersFilePath = path.join(__dirname, '../data/users.json');

// // Foydalanuvchilarni fayldan o'qish
// function readUsersFromFile() {
//     const data = fs.readFileSync(usersFilePath);
//     return JSON.parse(data);
// }

// // Foydalanuvchi ro'yxatga olish
// exports.registerUser = (req, res) => {
//     const { userName, pasvord, fullName, age, email } = req.body;

//     // Kerakli ma'lumotlarni tekshirish
//     if (!userName || !pasvord || !age || !email) {
//         return res.status(400).json({ message: 'UserName, Password, Age and Email are required!' });
//     }

//     const users = readUsersFromFile();
//     const newUser = {
//         id: users.length + 1,
//         userName,
//         pasvord,
//         fullName,
//         age,
//         email
//     };

//     // Foydalanuvchini ro'yxatga qo'shish
//     users.push(newUser);
//     fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

//     res.status(201).json(newUser);
// };