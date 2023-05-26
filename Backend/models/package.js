const { DataTypes } = require('sequelize');
const sequelize = require('../util-helpers/db');

const Status = {
    PENDING: 'PENDING',
    SCANNED: 'SCANNED'
};

const Package = sequelize.define('package', {
    voucher: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull:false,
    },
    postcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(Status.PENDING, Status.SCANNED),
        allowNull: false,
        defaultValue: Status.PENDING,
    }
},{
    // Disable timestamps
   timestamps: false,
});

module.exports = { Package, Status };