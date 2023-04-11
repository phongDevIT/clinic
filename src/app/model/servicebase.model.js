// const { DataTypes, Sequelize } = require('sequelize');

// module.exports = model;

// function model(sequelize) {
//     const attributes = {
//         id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
//         name: { type: DataTypes.STRING, allowNull: false },
//         status: { type: DataTypes.INTEGER, defaultValue: 1 },
//         createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
//         updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
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

//     return sequelize.define('servicebase', attributes);
// }

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ServiceBase = new Schema(
    {
        name: { type: String, required: true },
        status: { type: Number, default: 1 }
    },
    {
        timestamps: true,
    }
);

// Add plugins
mongoose.plugin(slug);
ServiceBase.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('ServiceBase', ServiceBase);