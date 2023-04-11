
const validateRequest = require('../../middleware/validate-request');
const patientService = require('../../config/db/patientDAO');

// route functions
function getAll(req, res, next) {
    patientService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    patientService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function getByType(req, res, next) {
    patientService.getByServiceBaseId(req.params.type)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    patientService.create(req.body)
        .then(() => res.json({
            message: 'Thêm mới thành công',
            status: true
        }))
        .catch(next);
}

function update(req, res, next) {
    patientService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'Cập nhập thành công',
            status: true
        }))
        .catch(next);
}

function _delete(req, res, next) {
    patientService.delete(req.params.id)
        .then(() => res.json({
            message: 'Xóa thành công',
            status: true
        }))
        .catch(next);
}

module.exports = {
    getAll,
    getById,
    getById,
    getByType,
    create,
    update,
    _delete
};