const db = require('../database/db');

const allPromotionsTable = 'all_promotions';

const createAllPromotionsTableIfNotExists = (callback) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${allPromotionsTable} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            image VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            url VARCHAR(255) NOT NULL
        );
    `;

    db.executeQuery(createTableQuery, [], (err, result) => {
        if (err) {
            console.error('Error creating all_promotions table:', err);
            callback(err);
            return;
        }
        callback(null);
    });
};

const getAllPromotions = (req, res) => {
    createAllPromotionsTableIfNotExists((err) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }

        db.executeQuery(`SELECT * FROM ${allPromotionsTable}`, [], (err, results) => {
            if (err) {
                console.error('Error fetching promotions:', err);
                res.status(500).send('Server error');
                return;
            }
            res.json(results);
        });
    });
};

const addAllPromotion = (req, res) => {
    const { image, title, message, url } = req.body;
    if (!image || !title || !message || !url) {
        return res.status(400).send('Please provide all required fields');
    }

    createAllPromotionsTableIfNotExists((err) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }

        const query = `INSERT INTO ${allPromotionsTable} (image, title, message, url) VALUES (?, ?, ?, ?)`;
        db.executeQuery(query, [image, title, message, url], (err, result) => {
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
    getAllPromotions,
    addAllPromotion
};
