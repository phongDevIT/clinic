// const { DataTypes, Sequelize } = require('sequelize');

// module.exports = model;

// function model(sequelize) {
//     const attributes = {
//         id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
//         name: { type: DataTypes.STRING, allowNull: false },
//         description: { type: DataTypes.STRING, allowNull: false },
//         status: { type: DataTypes.INTEGER, defaultValue: 1 },
//         createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         patientid: { type: Sequelize.INTEGER, allowNull: false },
//         totalprice: { type: DataTypes.STRING, allowNull: false }
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

//     return sequelize.define('prescription', attributes);
// }

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Bill = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    patientid: { type: mongoose.Types.ObjectId, required: true },
    doctorid: { type: mongoose.Types.ObjectId, required: true },
    totalprice: { type: String, required: true },
    status: { type: Number, default: 1 }
}, {
    timestamps: true,
});

// Add plugins
mongoose.plugin(slug);
Bill.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Bill', Bill);