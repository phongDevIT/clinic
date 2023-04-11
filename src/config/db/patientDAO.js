const bcrypt = require('bcryptjs');
const patient = require('../../app/model/patient.model');
const { mongooseToObject } = require('../../util/mongoose');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await patient.find({});
}

async function getById(id) {
    return await getPatient(id);
}

async function create(params) {
    // validate
    if (await patient.findOne({ fullname: params.fullname })) {
        throw 'Tên "' + params.fullname + '" đã được đăng ký';
    }

    const patientNew = new patient(params);
    var result = await patientNew.save();
    return result;
}

async function update(id, params) {
    const result = await getPatient(id);
    // validate
    const usernameChanged = params.fullname && result.fullname !== params.fullname;
    var validate = await patient.findOne({ fullname: params.fullname });
    if (usernameChanged && validate) {
        throw 'Bệnh nhân "' + params.fullname + '" đã được đăng ký';
    }
    var isSuccess = await patient.updateOne({ _id: id }, params);
    await isSuccess;
}

async function _delete(id) {
    const result = await getPatient(id);
    if (result) {
        var isDelete = await patient.deleteOne({ _id: id });
        return isDelete;
    }
    return null;
}

async function getPatient(id) {
    const result = await patient.findById(id);
    if (!result) throw 'Bệnh nhân không tồn tại';
    return mongooseToObject(result);
}