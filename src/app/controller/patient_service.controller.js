const validateRequest = require('../../middleware/validate-request');
const patient_serviceService = require('../../config/db/patient_serviceDAO');

// route functions
function getAll(req, res, next) {
    patient_serviceService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    patient_serviceService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function getByType(req, res, next) {
    patient_serviceService.getByServiceBaseId(req.params.type)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    patient_serviceService.create(req.body)
        .then(() => res.json({
            message: 'Thêm mới thành công',
            status: true
        }))
        .catch(next);
}

function update(req, res, next) {
    patient_serviceService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'Cập nhập thành công',
            status: true
        }))
        .catch(next);
}

function getpatient_service(req, res, next) {
    patient_serviceService.getpatient_service(req.params.id)
        .then(users => res.json(users))
        .catch(next);
}

module.exports = {
    getAll,
    getById,
    getById,
    getByType,
    create,
    update,
    getpatient_service
};