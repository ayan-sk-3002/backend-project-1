const db = require('../database/db');

const selectedPromotionsTable = 'selected_promotions';

// Function to create the table if it doesn't exist
const createSelectedPromotionsTableIfNotExists = (callback) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${selectedPromotionsTable} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            image VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            url VARCHAR(255) NOT NULL,
            user_names JSON NOT NULL
        );
    `;

    db.executeQuery(createTableQuery, [], (err, result) => {
        if (err) {
            console.error('Error creating selected_promotions table:', err);
            callback(err);
            return;
        }
        callback(null);
    });
};

// Function to retrieve all selected promotions
const getSelectedPromotions = (req, res) => {
    createSelectedPromotionsTableIfNotExists((err) => {
        if (err) {
            console.error('Error creating selected_promotions table:', err);
            res.status(500).send('Server error');
            return;
        }

        const query = `SELECT * FROM ${selectedPromotionsTable}`;
        db.executeQuery(query, [], (err, results) => {
            if (err) {
                console.error('Error fetching promotions:', err);
                res.status(500).send('Server error');
                return;
            }
            res.json(results);
        });
    });
};

// Function to add a new promotion
const addSelectedPromotion = (req, res) => {
    const { image, title, message, url, user_names } = req.body;
    if (!image || !title || !message || !url || !user_names) {
        return res.status(400).send('Please provide all required fields');
    }

    createSelectedPromotionsTableIfNotExists((err) => {
        if (err) {
            console.error('Error creating selected_promotions table:', err);
            res.status(500).send('Server error');
            return;
        }

        const insertQuery = `
            INSERT INTO ${selectedPromotionsTable} (image, title, message, url, user_names) VALUES (?, ?, ?, ?, ?)
        `;
        const values = [image, title, message, url, JSON.stringify(user_names)];

        db.executeQuery(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting promotion:', err);
                res.status(500).send('Server error');
                return;
            }
            res.status(201).send('Promotion added successfully');
        });
    });
};

module.exports = {
    getSelectedPromotions,
    addSelectedPromotion
};
