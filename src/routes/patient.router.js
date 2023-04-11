const express = require('express');
const router = express.Router();
const patientController = require('../app/controller/patient.controller');
const authMiddleware = require('../middleware/auth.middlewares');
const isAuth = authMiddleware.isAuth;

router.get('/getall', isAuth, patientController.getAll);
router.get('/getbyid/:id', isAuth, patientController.getById);
router.post('/', patientController.create);
router.put('/:id', isAuth, patientController.update);
router.delete('/:id', isAuth, patientController._delete);

module.exports = router;