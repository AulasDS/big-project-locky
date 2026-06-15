const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/ProdutoController');

router.post('/', produtoController.create);
router.get('/', produtoController.getAll);
router.get('/:id', produtoController.getById);
router.put('/:id', produtoController.update);
router.delete('/:id', produtoController.delete);

module.exports = router;
