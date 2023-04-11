const express = require('express');
const router = express.Router();
const patientServiceController = require('../app/controller/patient_service.controller');
const authMiddleware = require('../middleware/auth.middlewares');
const isAuth = authMiddleware.isAuth;

router.get('/getall', isAuth, patientServiceController.getAll);
router.get('/getbyid/:id', isAuth, patientServiceController.getById);
router.get('/getpatientservice/:id', isAuth, patientServiceController.getpatient_service);
router.post('/', patientServiceController.create);
// router.put('/:id', patientServiceController.update);
// router.delete('/:id', patientServiceController._delete);

module.exports = router;