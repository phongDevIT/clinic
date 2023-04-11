const Joi = require('joi');
const validateRequest = require('../../middleware/validate-request');
const acountService = require('../../config/db/accountDAO');

// route functions
function getAll(req, res, next) {
    acountService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    acountService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    acountService.create(req.body)
        .then(() => res.json({
            message: 'Thêm mới thành công',
            status: true
        }))
        .catch(next);
}

function update(req, res, next) {
    acountService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'Cập nhập thành công',
            status: true
        }))
        .catch(next);
}

function _delete(req, res, next) {
    acountService.delete(req.params.id)
        .then(() => res.json(
            {
                message: 'Xóa thành công',
                status: true
            }))
        .catch(next);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    _delete
};
