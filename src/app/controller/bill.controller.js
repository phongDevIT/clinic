const Joi = require('joi');
const validateRequest = require('../../middleware/validate-request');
const billService = require('../../config/db/billDAO');
const excelJs = require("exceljs");

// route functions
function getAll(req, res, next) {
    billService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getBillByPatientId(req, res, next) {
    billService.getBillByPatientId(req.params.patientid).then(user => res.json(user))
        .catch(next);;
}

function getTotalRevenue(req, res, next) {
    billService.getAll()
        .then((user) => {
            let sum = 0;
            user.forEach((e) => {
                sum += parseInt(e.totalprice);
            });
            res.json(sum);
        })
        .catch(next);
}

function getById(req, res, next) {
    billService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function ExportExcelFromRevenue(req, res, next) {
    billService.ExportExcelFromRevenue(req.body.fromDate, req.body.toDate)
        .then((user) => {
            let workbook = new excelJs.Workbook();

            const sheet = workbook.addWorksheet("books");
            // sheet.getCell(`A1`).value = "Tổng doanh thu " + sum + "đ"; // Assign title to cell A1 -- THIS IS WHAT YOU'RE LOOKING FOR.
            // sheet.mergeCells('A1:G1'); // Extend cell over all column headers
            sheet.columns = [
                { header: "Tên", key: "name", width: 40 },
                { header: "Mô tả", key: "description", width: 75 },
                { header: "Giá", key: "totalprice", width: 25 },
                { header: "Ngày", key: "createdAt", width: 25 }
            ];

            let dataJson = JSON.stringify(user);
            let object = JSON.parse(dataJson);

            object.map((value, id) => {
                sheet.addRow({
                    name: value.name,
                    description: value.description,
                    totalprice: value.totalprice + "đ",
                    createdAt: billService.formatDate(value.createdAt),
                })
            });

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );

            res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");

            workbook.xlsx.write(res);
        })
        .catch(next);
}

function create(req, res, next) {
    billService.create(req.body)
        .then(() => res.json({
            message: 'Thêm mới thành công',
            status: true
        }))
        .catch(next);
}

function update(req, res, next) {
    billService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'Cập nhập thành công',
            status: true
        }))
        .catch(next);
}

function _delete(req, res, next) {
    billService.delete(req.params.id)
        .then(() => res.json({
            message: 'Xóa thành công',
            status: true
        }))
        .catch(next);
}

module.exports = {
    getAll,
    getById,
    getBillByPatientId,
    ExportExcelFromRevenue,
    getTotalRevenue,
    create,
    update,
    _delete
};