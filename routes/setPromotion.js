const express = require('express');
const router = express.Router();
const AllPromotionController = require("../controllers/AllPromotionController")
const SelectedPromotionController = require("../controllers/SelectedPromotionController")
const unregisterPromotionController = require("../controllers/UnRegisteredPromotionController")

router.post('/', AllPromotionController.addAllPromotion);
router.post('/selected', SelectedPromotionController.addSelectedPromotion);
router.post('/unregister', unregisterPromotionController.addUnRegisteredPromotion);

module.exports = router;
