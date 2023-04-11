const validateRequest = require('../../middleware/validate-request');
const doctorService = require('../../config/db/doctorDAO');

// route functions
function getAll(req, res, next) {
    doctorService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    doctorService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    doctorService.create(req.body)
        .then(() => res.json({
            message: 'Thêm mới thành công',
            status: true
        }))
        .catch(next);
}

function update(req, res, next) {
    doctorService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'Cập nhập thành công',
            status: true
        }))
        .catch(next);
}

function _delete(req, res, next) {
    doctorService.delete(req.params.id)
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
    create,
    update,
    _delete
};