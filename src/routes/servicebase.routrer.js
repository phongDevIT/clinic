const express = require('express');
const router = express.Router();
const servicebaseController = require('../app/controller/servicebase.controller');
const authMiddleware = require('../middleware/auth.middlewares');
const isAuth = authMiddleware.isAuth;

router.get('/getall', servicebaseController.getAll);
router.get('/getbyid/:id', servicebaseController.getById);
router.post('/', isAuth, servicebaseController.create);
router.put('/:id', isAuth, servicebaseController.update);
router.delete('/:id', isAuth, servicebaseController._delete);

module.exports = router;