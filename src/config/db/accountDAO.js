const bcrypt = require('bcryptjs');
const account = require('../../app/model/account.model');
const { mongooseToObject } = require('../../util/mongoose');

module.exports = {
    getAll,
    getById,
    getAccountByUserName,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await account.find({});
}

async function getById(id) {
    return await getAccount(id);
}

async function create(params) {
    // validate
    if (await account.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" đã được đăng ký';
    }

    const accountNew = new account(params);
    var result = await accountNew.save();
    return result;
}

async function update(id, params) {
    const result = await getAccount(id);
    // validate
    const usernameChanged = params.username && result.username !== params.username;
    var validate = await account.findOne({ username: params.username });
    if (usernameChanged && validate) {
        throw 'Username "' + params.username + '" đã được đăng ký';
    }
    var isSuccess = await account.updateOne({ _id: id }, params);
    await isSuccess;
}

async function _delete(id) {
    const result = await getAccount(id);
    if (result) {
        var isDelete = await account.deleteOne({ _id: id });
        return isDelete;
    }
    return null;
}

// helper functions

async function getAccount(id) {
    const result = await account.findById(id);
    if (!result) throw 'Tài khoản không tồn tại';
    return mongooseToObject(result);
}


async function getAccountByUserName(name) {
    var result = await account.findOne({ username: name });
    return result;
}