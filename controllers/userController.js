const bcrypt = require('bcrypt');
const db = require('../database/db');

// Function to create the users table if it doesn't exist
const createUsersTableIfNotExists = (callback) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;

    db.executeQuery(createTableQuery, [], (err, result) => {
        if (err) {
            console.error('Error creating users table:', err);
            callback(err);
            return;
        }
        callback(null);
    });
};

// Function to get all users
const getUsers = (req, res) => {
    createUsersTableIfNotExists((err) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        db.executeQuery('SELECT * FROM users', [], (err, results) => {
            if (err) {
                console.error('Error fetching users:', err);
                res.status(500).send('Server error');
                return;
            }
            res.json(results);
        });
    });
};

// Function to add a new user
const addUser = async (req, res) => {
    createUsersTableIfNotExists((err) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                res.status(500).send('Server error');
                return;
            }

            const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.executeQuery(query, [username, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    res.status(500).send('Server error');
                    return;
                }
                res.status(201).send('User added successfully');
            });
        });
    });
};

module.exports = {
    getUsers,
    addUser
};
