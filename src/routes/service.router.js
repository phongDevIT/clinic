const express = require('express');
const router = express.Router();
const serviceController = require('../app/controller/service.controller');
const authMiddleware = require('../middleware/auth.middlewares');
const isAuth = authMiddleware.isAuth;

router.get('/getall', serviceController.getAll);
router.get('/getbyid/:id', serviceController.getById);
router.get('/getservicebypatientid/:id', isAuth, serviceController.getServiceByPatientId);
router.get('/servicebase/:type', isAuth, serviceController.getByType);
router.post('/', isAuth, serviceController.create);
router.put('/:id', isAuth, serviceController.update);
router.delete('/:id', isAuth, serviceController._delete);

module.exports = router;