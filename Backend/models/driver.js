const { DataTypes } = require('sequelize');
const sequelize = require('../util-helpers/db');

const Driver = sequelize.define('driver', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
    },{
         // Disable timestamps
        timestamps: false,
    }
);

module.exports = Driver;
