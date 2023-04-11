const bcrypt = require('bcryptjs');
const servicebase = require('../../app/model/servicebase.model');
const { mongooseToObject } = require('../../util/mongoose');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await servicebase.find({});
}

async function getById(id) {
    return await getServiceBase(id);
}

async function create(params) {
    // validate
    if (await servicebase.findOne({ name: params.name })) {
        throw 'Name "' + params.name + '" đã được đăng ký';
    }

    const servicebaseNew = new servicebase(params);
    var result = await servicebaseNew.save();
    return result;
}

async function update(id, params) {
    const result = await getServiceBase(id);
    // validate
    const usernameChanged = params.name && result.name !== params.name;
    var validate = await servicebase.findOne({ name: params.name });
    if (usernameChanged && validate) {
        throw 'Name "' + params.name + '" đã được đăng ký';
    }
    var isSuccess = await servicebase.updateOne({ _id: id }, params);
    await isSuccess;
}

async function _delete(id) {
    const result = await getServiceBase(id);
    if (result) {
        var isDelete = await servicebase.deleteOne({ _id: id });
        return isDelete;
    }
    return null;
}

async function getServiceBase(id) {
    const result = await servicebase.findById(id);
    if (!result) throw 'Dịch vụ không tồn tại';
    return mongooseToObject(result);
}