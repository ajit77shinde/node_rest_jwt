const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
router.get('/', userController.getAll);
router.post('/', userController.create);
router.get('/:userId', userController.getById);
router.put('/:userId', userController.updateById);
router.delete('/:userId', userController.deleteById);
module.exports = router;