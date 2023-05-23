const express = require('express');
const dataController = require('../controllers/data');

const router = express.Router();

router.put('/reset', dataController.reset);


module.exports = router;