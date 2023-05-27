const { DataTypes } = require('sequelize');
const sequelize= require('../util-helpers/db');

const Cluster = sequelize.define('cluster', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull:false,
    },
    postcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}
,{
    // Disable timestamps
   timestamps: false,
});


module.exports = Cluster;