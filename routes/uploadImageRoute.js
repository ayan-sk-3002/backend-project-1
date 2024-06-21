const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadImage');

router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
    res.status(200).json({ fileUrl });
});

module.exports = router;
