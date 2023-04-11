const bcrypt = require('bcryptjs');
const service = require('../../app/model/service.model');
const { mongooseToObject } = require('../../util/mongoose');
const mongoose = require('mongoose');
module.exports = {
    getAll,
    getById,
    getByServiceBaseId,
    getServiceByPatientId,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await service.find({});
}

async function getByServiceBaseId(servicebaseId) {
    return await service.find({ servicebaseId: new mongoose.Types.ObjectId(servicebaseId) });
}

async function getById(id) {
    return await getservice(id);
}

async function getServiceByPatientId(id) {
    var result = service.aggregate([{
        $lookup: {
            from: "patientservices",
            localField: "id",
            foreignField: "serviecid",
            as: "patientservices"
        }
    }]);
    console.log(result);
    return result;
}

async function create(params) {
    // validate
    if (await service.findOne({ name: params.name })) {
        throw 'Tên "' + params.name + '" đã được đăng ký';
    }

    const serviceNew = new service(params);
    var result = await serviceNew.save();
    return result;
}

async function update(id, params) {
    const result = await getservice(id);
    // validate
    const usernameChanged = params.name && result.name !== params.name;
    var validate = await service.findOne({ name: params.name });
    if (usernameChanged && validate) {
        throw 'Dịch vụ "' + params.name + '" đã được đăng ký';
    }
    var isSuccess = await service.updateOne({ _id: id }, params);
    await isSuccess;
}

async function _delete(id) {
    const result = await getservice(id);
    if (result) {
        var isDelete = await service.deleteOne({ _id: id });
        return isDelete;
    }
    return null;
}

async function getservice(id) {
    const result = await service.findById(id);
    if (!result) throw 'Dịch vụ không tồn tại';
    return mongooseToObject(result);
}