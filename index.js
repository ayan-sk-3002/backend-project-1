const express = require('express');
const app = express();
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const setPromotion = require('./routes/setPromotion');
const getPromotion = require('./routes/getPromotion');
const uploadImage = require('./routes/uploadImageRoute');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Middleware 
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoints
app.use('/users', userRoutes);
app.use('/get-promotions', getPromotion);
app.use('/add-promotions', setPromotion);
app.use('/upload-image', uploadImage);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to my API</h1>');
});

app.listen(config.port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${config.port}`);
    } else {
        console.log('Error', error);
    }
});
