const express = require('express');
const toughtController = require('../controllers/ToughtsController');
const router = express.Router();

// helpers
const checkAuth = require('../helpers/auth').checkAuth;

router.get('/', checkAuth, toughtController.showToughts);
router.get('/toughts', checkAuth, toughtController.showToughts);
router.get('/dashboard', checkAuth, toughtController.dashboard);
router.get('/add', checkAuth, toughtController.createTought);
router.post('/add', checkAuth, toughtController.createToughtPost);
router.post('/remove', checkAuth, toughtController.deleteTought);

router.post('/edit', checkAuth, toughtController.editToughtPost);
router.get('/edit/:id', checkAuth, toughtController.editTought);

module.exports = router;
