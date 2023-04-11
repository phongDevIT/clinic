// const { DataTypes, Sequelize } = require('sequelize');

// module.exports = model;

// function model(sequelize) {
//     const attributes = {
//         id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
//         fullname: { type: DataTypes.STRING, allowNull: false },
//         email: { type: DataTypes.STRING, allowNull: false },
//         address: { type: DataTypes.STRING, allowNull: false },
//         phone: { type: DataTypes.STRING, allowNull: false },
//         birthday: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         status: { type: DataTypes.INTEGER, defaultValue: 1 },
//         createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         roleid: { type: DataTypes.INTEGER, defaultValue: 0 }
//     };

//     // const options = {
//     //     defaultScope: {
//     //         // exclude password hash by default
//     //         attributes: { exclude: ['passwordHash'] }
//     //     },
//     //     scopes: {
//     //         // include hash with this scope
//     //         withHash: { attributes: {}, }
//     //     }
//     // };

//     return sequelize.define('patient', attributes);
// }

// const { DataTypes, Sequelize } = require('sequelize');

// module.exports = model;

// function model(sequelize) {
//     const attributes = {
//         id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
//         fullname: { type: String, required: true },
//         email: { type: String, required: true },
//         address: { type: String, required: true },
//         phone: { type: String, required: true },
//         birthday: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         status: { type: DataTypes.INTEGER, defaultValue: 1 },
//         createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         position: { type: String, required: true },
//         roleid: { type: DataTypes.INTEGER, defaultValue: 1 }
//     };

//     // const options = {
//     //     defaultScope: {
//     //         // exclude password hash by default
//     //         attributes: { exclude: ['passwordHash'] }
//     //     },
//     //     scopes: {
//     //         // include hash with this scope
//     //         withHash: { attributes: {}, }
//     //     }
//     // };

//     return sequelize.define('doctor', attributes);
// }

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Patient = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    birthday: { type: Date },
    status: { type: Number, default: 1 },
    gender: { type: Number, required: true },
    roleid: { type: Number, default: 0 }
}, {
    timestamps: true,
});

// Add plugins
mongoose.plugin(slug);
Patient.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Patient', Patient);