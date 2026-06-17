const express = require('express');
const router = express.Router();
const conteudoController = require('../controllers/ConteudoController');

router.post('/', conteudoController.create);
router.get('/', conteudoController.getAll);
router.get('/:id', conteudoController.getById);
router.put('/:id', conteudoController.update);
router.delete('/:id', conteudoController.delete);

module.exports = router;
