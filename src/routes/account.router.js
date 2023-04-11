const express = require('express');
const router = express.Router();
const accountController = require('../app/controller/account.controller');
const authMiddleware = require('../middleware/auth.middlewares');
const isAuth = authMiddleware.isAuth;

router.get('/getall', isAuth, accountController.getAll);
router.get('/getbyid/:id', accountController.getById);
router.post('/', isAuth, accountController.create);
router.put('/:id', isAuth, accountController.update);
router.delete('/:id', isAuth, accountController._delete);

module.exports = router;