const db = require('../database/db');

const unregisterPromotionsTable = 'unregistered_promotions';

// Function to create the table if it doesn't exist
const createUnRegisteredPromotionsTableIfNotExists = (callback) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${unregisterPromotionsTable} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            image VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            url VARCHAR(255) NOT NULL
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
const getUnRegisteredPromotions = (req, res) => {
    createUnRegisteredPromotionsTableIfNotExists((err) => {
        if (err) {
            console.error('Error creating selected_promotions table:', err);
            res.status(500).send('Server error');
            return;
        }

        const query = `SELECT * FROM ${unregisterPromotionsTable}`;
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
const addUnRegisteredPromotion = (req, res) => {

    
    const { image, title, message, url } = req.body;
    if (!image || !title || !message || !url ) {
        return res.status(400).send('Please provide all required fields');
    }

    createUnRegisteredPromotionsTableIfNotExists((err) => {
        if (err) {
            console.error('Error creating selected_promotions table:', err);
            res.status(500).send('Server error');
            return;
        }

        const insertQuery = `
            INSERT INTO ${unregisterPromotionsTable} (image, title, message, url) VALUES (?, ?, ?, ?)
        `;
        const values = [image, title, message, url];

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
    getUnRegisteredPromotions,
    addUnRegisteredPromotion
};
