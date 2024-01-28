const express = require('express');
const toughtController = require('../controllers/ToughtsController');
const router = express.Router();

// Import the tought controller
// Define your tought routes here
router.get('/', toughtController.showToughts);

router.get('/toughts', toughtController.showToughts);

// router.post('/toughts', toughtController.createTought);

// router.put('/toughts/:id', toughtController.updateTought);

// router.delete('/toughts/:id', toughtController.deleteTought);

module.exports = router;
