const express = require('express');
const router = express.Router();
const doctorController = require('../app/controller/doctor.controller');
const authMiddleware = require('../middleware/auth.middlewares');
const isAuth = authMiddleware.isAuth;

router.get('/getall', isAuth, doctorController.getAll);
router.get('/getbyid/:id', isAuth, doctorController.getById);
router.post('/', isAuth, doctorController.create);
router.put('/:id', isAuth, doctorController.update);
router.delete('/:id', isAuth, doctorController._delete);

module.exports = router;