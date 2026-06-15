const express = require('express');
const router = express.Router();
const compraController = require('../controllers/CompraController');

router.post('/', compraController.create);
router.get('/', compraController.getAll);
router.get('/:id', compraController.getById);
router.put('/:id', compraController.update);
router.delete('/:id', compraController.delete);

module.exports = router;
