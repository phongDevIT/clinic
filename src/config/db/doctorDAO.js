const bcrypt = require('bcryptjs');
const doctor = require('../../app/model/doctor.model');
const { mongooseToObject } = require('../../util/mongoose');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await doctor.find({});
}

async function getById(id) {
    return await getdoctor(id);
}

async function create(params) {
    // validate
    if (await doctor.findOne({ fullname: params.fullname })) {
        throw 'Tên bác sĩ "' + params.fullname + '" đã được đăng ký';
    }

    const doctorNew = new doctor(params);
    var result = await doctorNew.save();
    return result;
}

async function update(id, params) {
    const result = await getdoctor(id);
    // validate
    const usernameChanged = params.fullname && result.fullname !== params.fullname;
    var validate = await doctor.findOne({ name: params.fullname });
    if (usernameChanged && validate) {
        throw 'Tên bác sĩ "' + params.fullname + '" đã được đăng ký';
    }
    var isSuccess = await doctor.updateOne({ _id: id }, params);
    await isSuccess;
}

async function _delete(id) {
    const result = await getdoctor(id);
    if (result) {
        var isDelete = await doctor.deleteOne({ _id: id });
        return isDelete;
    }
    return null;
}

async function getdoctor(id) {
    const result = await doctor.findById(id);
    if (!result) throw 'Tên bác sĩ không tồn tại';
    return mongooseToObject(result);
}