const { DataTypes } = require('sequelize');
const sequelize = require('../util-helpers/db');
const Cluster = require('./cluster');

const Driver = sequelize.define('driver', {
    name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    // clusterId: {
    //     type: DataTypes.STRING,
    //     allowNull:false,
    //     reference: {
    //         model: Cluster,
    //         key: 'id',
    //     }
    // },
},{
     // Disable timestamps
    timestamps: false,
});

module.exports = Driver;
