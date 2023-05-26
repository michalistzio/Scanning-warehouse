const express = require('express');
const {body} = require('express-validator');
const router = express.Router();

const destributionController = require('../controllers/destribution');

router.put('/scan', 
    [
        body('voucher')
            .trim()
            .isLength({min: 3, max: 3})
    ],
    destributionController.putScan
);

router.get('/packages', destributionController.getPackages);

module.exports = router;