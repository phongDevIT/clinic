const { DataTypes, Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.INTEGER, defaultValue: 1 }
    };

    // const options = {
    //     defaultScope: {
    //         // exclude password hash by default
    //         attributes: { exclude: ['passwordHash'] }
    //     },
    //     scopes: {
    //         // include hash with this scope
    //         withHash: { attributes: {}, }
    //     }
    // };

    return sequelize.define('role', attributes);
}