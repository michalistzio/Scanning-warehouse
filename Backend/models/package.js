const { DataTypes } = require('sequelize');
const sequelize = require('../util-helpers/db');

const Package = sequelize.define('package', {
    voucher: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull:false,
    },
    postcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    // Disable timestamps
   timestamps: false,
});

module.exports = Package;