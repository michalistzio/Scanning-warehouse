const express = require('express');
const dataController = require('../controllers/data');

const router = express.Router();

router.post('/reset', dataController.reset);


module.exports = router;