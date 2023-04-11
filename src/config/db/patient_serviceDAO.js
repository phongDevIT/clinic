const bcrypt = require('bcryptjs');
const patient_service = require('../../app/model/patient_service.model');
const service = require('../../app/model/service.model');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getpatient_service
};
async function getAll() {
    return await patient_service.find({});
}

async function getById(id) {
    return await getpatient_service(id);
}

async function create(params) {
    const patient_serviceNew = new patient_service(params);
    var result = await patient_serviceNew.save();
    return result;
}

async function update(id, params) {
    var isSuccess = await patient_service.updateOne({ _id: id }, params);
    await isSuccess;
}

async function _delete(id) {
    const result = await getpatient_service(id);
    if (result) {
        var isDelete = await patient_service.deleteOne({ _id: id });
        return isDelete;
    }
    return null;
}

async function getpatient_service(id) {
    const patient_services = await patient_service.find({ patientid: id });
    if (patient_services.length < 0) throw 'Bệnh nhân không tồn tại';
    let result = [];
    const services = await service.find({});
    let a = mutipleMongooseToObject(patient_services);
    let b = mutipleMongooseToObject(services);
    mutipleMongooseToObject(patient_services).forEach((pt) => {
        mutipleMongooseToObject(services).forEach((s) => {
            console.log(pt.serviceid.toString());
            console.log(s._id.toString());
            if (pt.serviceid.toString() == s._id.toString()) {
                result.push(s)
            }
        })
    })

    return result;
}