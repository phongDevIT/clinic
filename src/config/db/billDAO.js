const bcrypt = require('bcryptjs');
const bill = require('../../app/model/bill.model');
const { mongooseToObject } = require('../../util/mongoose');
const mongoose = require('mongoose');

module.exports = {
    getAll,
    getById,
    getBillByPatientId,
    ExportExcelFromRevenue,
    create,
    update,
    delete: _delete,
    formatDate
};

async function getAll() {
    return await bill.find({});
}

async function getBillByPatientId(patientId) {
    return await bill.find({ patientid: new mongoose.Types.ObjectId(patientId) });
}

async function getById(id) {
    return await getBill(id);
}

async function ExportExcelFromRevenue(fromDate, toDate) {
    var result = await bill.find({});
    var newResult = [];
    var timeElapsed = Date.now();
    var today = new Date(timeElapsed);
    var prevDate = formatDate(fromDate);
    var now = formatDate(today);
    if (toDate != null) {
        now = formatDate(toDate);
    }
    result.forEach((e) => {
        var createdAt = formatDate(e.createdAt);
        if (createdAt >= prevDate && createdAt <= now) {
            newResult.push(e);
        }
    })
    console.log(newResult);
    return newResult;
}

async function create(params) {
    // validate
    if (await bill.findOne({ name: params.name })) {
        throw 'Hóa đơn "' + params.name + '" đã được đăng ký';
    }

    const billNew = new bill(params);
    var result = await billNew.save();
    return result;
}

async function update(id, params) {
    var isSuccess = await bill.updateOne({ _id: id }, params);
    await isSuccess;
}

async function _delete(id) {
    const result = await getBill(id);
    if (result) {
        var isDelete = await bill.deleteOne({ _id: id });
        return isDelete;
    }
    return null;
}

async function getBill(id) {
    const result = await bill.findById(id);
    if (!result) throw 'Hóa đơn không tồn tại';
    return mongooseToObject(result);
}

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}