// const { DataTypes, Sequelize } = require('sequelize');

// module.exports = model;

// function model(sequelize) {
//     const attributes = {
//         id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
//         name: { type: DataTypes.STRING, allowNull: false },
//         status: { type: DataTypes.INTEGER, defaultValue: 1 },
//         createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         totalprice: { type: DataTypes.STRING, allowNull: false },
//         type: { type: DataTypes.INTEGER, allowNull: false }
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

//     return sequelize.define('service', attributes);
// }

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Service = new Schema({
    name: { type: String, required: true },
    totalPrice: { type: String, required: true },
    servicebaseId: { type: mongoose.Types.ObjectId, required: true },
    status: { type: Number, default: 1 }
}, {
    timestamps: true,
}, );

// Add plugins
mongoose.plugin(slug);
Service.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Service', Service);