const Joi = require('joi');
const validateRequest = require('../../middleware/validate-request');
const serviceService = require('../../config/db/serviceDAO');

// route functions
function getAll(req, res, next) {
    serviceService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    serviceService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function getByType(req, res, next) {
    serviceService.getByServiceBaseId(req.params.type)
        .then(user => res.json(user))
        .catch(next);
}

function getServiceByPatientId(req, res, next) {
    serviceService.getServiceByPatientId(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    serviceService.create(req.body)
        .then(() => res.json({
            message: 'Thêm mới thành công',
            status: true
        }))
        .catch(next);
}

function update(req, res, next) {
    serviceService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'Cập nhập thành công',
            status: true
        }))
        .catch(next);
}

function _delete(req, res, next) {
    serviceService.delete(req.params.id)
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
    _delete,
    getServiceByPatientId
};