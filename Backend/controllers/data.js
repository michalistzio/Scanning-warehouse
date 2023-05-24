const express = require('express');
const Cluster = require('../models/cluster');
const Driver = require('../models/driver');
const Package = require('../models/package');

exports.reset = async(req, res, next) => {
    
    const clusters = [
        {id: 'A', postcode: 10},
        {id: 'B', postcode: 11},
        {id: 'C', postcode: 16}
    ];

    const drivers = [
        {name: 'Moe', clusterId: 'A'},
        {name: 'Larry', clusterId: 'B'},
        {name: 'Curly', clusterId: 'C'}
    ];

    const packages = [
        {voucher: 'A1A', postcode: 10041},
        {voucher: 'B2B', postcode: 11332},
        {voucher: 'C3C', postcode: 10042},
        {voucher: 'D4D', postcode: 11342},
        {voucher: 'E5E', postcode: 11444},
        {voucher: 'F6F', postcode: 16788},
        {voucher: 'G7G', postcode: 16788},
        {voucher: 'H8H', postcode: 10043},
        {voucher: 'I9I', postcode: 16800},
        {voucher: 'J0J', postcode: 16801}
    ];

    try{
        await Cluster.destroy({
            where: {}
          });
        await Driver.destroy({
            where: {},
            truncate: true
          });
        await Package.destroy({
            where: {},
            truncate: true
          });
        await Cluster.bulkCreate(clusters);
        await Driver.bulkCreate(drivers);
        await Package.bulkCreate(packages);
        res.status(201).json({
            message: 'Data stored successfully',
          });
    } catch (err) {
        if (!err.statusCode) {
            res.status(500).json({
                message: 'Error creating data',
                error: err.message,
              });
        }
        next(err);
    }

}