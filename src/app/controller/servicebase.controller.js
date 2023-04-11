const serviceBaseService = require('../../config/db/servicebaseDAO');

// route functions
function getAll(req, res, next) {
    serviceBaseService.getAll()
        .then(servicebases => res.json(servicebases))
        .catch(next);
}

function getById(req, res, next) {
    serviceBaseService.getById(req.params.id)
        .then(servicebase => res.json(servicebase))
        .catch(next);
}

function create(req, res, next) {
    serviceBaseService.create(req.body)
        .then(() => res.json({
            message: 'Thêm mới thành công',
            status: true
        }))
        .catch(next);
}

function update(req, res, next) {
    serviceBaseService.update(req.params.id, req.body)
        .then(() => res.json({
            message: 'Cập nhập thành công',
            status: true
        }))
        .catch(next);
}

function _delete(req, res, next) {
    serviceBaseService.delete(req.params.id)
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
