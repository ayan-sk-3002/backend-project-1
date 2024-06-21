const express = require('express');
const router = express.Router();
const AllPromotionController = require("../controllers/AllPromotionController")
const SelectedPromotionController = require("../controllers/SelectedPromotionController")

router.get('/', AllPromotionController.getAllPromotions);
router.get('/selected', SelectedPromotionController.getSelectedPromotions);

module.exports = router;
