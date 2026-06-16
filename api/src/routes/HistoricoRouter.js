const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');

router.post('/', historicoController.create);
router.get('/', historicoController.getAll);
router.get('/:id', historicoController.getById);
router.put('/:id', historicoController.update);
router.delete('/:id', historicoController.delete);

module.exports = router;
