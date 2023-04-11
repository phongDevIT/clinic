const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Account = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: Number, default: 1 },
    roleid: { type: Number, default: 1 }
}, {
    timestamps: true,
}, );

// Add plugins
mongoose.plugin(slug);
Account.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Account', Account);