const express = require("express");
const router = express.Router();
const billController = require("../app/controller/bill.controller");
const authMiddleware = require("../middleware/auth.middlewares");
const isAuth = authMiddleware.isAuth;

router.get("/getall", isAuth, billController.getAll);
router.get("/getbyid/:id", isAuth, billController.getById);
router.get("/totalrevenue", isAuth, billController.getTotalRevenue);
router.get("/getbillbypatientid/:patientid", billController.getBillByPatientId);
router.post("/exportexcel", isAuth, billController.ExportExcelFromRevenue); //exportexcel/id = asdadadsasdsa
router.post("/", isAuth, billController.create);
router.put("/:id", isAuth, billController.update);
router.delete("/:id", isAuth, billController._delete);

module.exports = router;
