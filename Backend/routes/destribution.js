const express = require('express');
const {body} = require('express-validator');
const router = express.Router();

const destributionController = require('../controllers/destribution');

router.get('/pick-up', destributionController.getPickUpPackages);

router.put('/scan', 
    [
        body('voucher')
            .trim()
            .isLength({min: 3, max: 3})
    ],
    destributionController.putScan
);

router.get('/remain-packages', destributionController.getRemainPackages);

module.exports = router;