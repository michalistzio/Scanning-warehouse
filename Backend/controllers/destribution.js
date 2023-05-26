const { Op } = require('sequelize');
const express = require('express');
const Cluster = require('../models/cluster');
const Driver = require('../models/driver');
const { Package, Status}  = require('../models/package');
const { validationResult } = require('express-validator');

exports.putScan = async (req, res, next) => {

    //check for validation of voucher
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const err = new Error('Validation Failed, entered data is incorrect.');
        err.statusCode = 422;
        return next(err);
    }

    const voucher = req.body.voucher;
    try{
        //find the package with voucher
        const scaned = await Package.findByPk(voucher)
        
        if (!scaned){
            const error = new Error(`Item doesn't exist.`);
            error.statusCode = 404;
            throw error;
        }

        //if the package has scanned it can not scanned again
        if (scaned.dataValues.status == Status.SCANNED){
            const error = new Error(`The item has already scanned!`);
            error.statusCode = 404;
            throw error;
        }

        //if voucher is OK and the package has not scanned. then package scanned
        await Package.update({status: Status.SCANNED}, {
            where: {voucher: voucher}
        })
        res.status(200).json({message: 'Item scanned!'});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    } 
};

exports.getPackages = async (req, res, next) => {
    
    //query paramater give us for pending all the pending packages, for scanned all the scanned and for null all the packages regardless of the statuts
    var filter = req.query.status || null;
    if (filter != null){
        filter = filter.toUpperCase();
    }
    
    if (filter != Status.PENDING && filter != Status.SCANNED && filter != null ){
        const err = new Error('Invalid query parameters');
        //422 for validation error
        err.statusCode = 400;
        next(err);
    }  

    try{
        //join cluster table with drivers to find which postcodes is responsible every driver
        const join = await Driver.findAll({
            include: [ 
                {
                    model: Cluster,
                    attributes: ['id', 'postcode']
                }
            ],
            attributes: ['name']
        });
        
        var statusFilter = {};
        const driverPackages = [];
        ready = [];

        statusFilter = filter ? {status: filter} : {}

        //find which packages belong to each driver
        for (const driver of join) {
            const clusterPosts = driver.cluster.dataValues.postcode;
            const packages = await Package.findAll({
                where: {
                    postcode: {
                        [Op.and]: [
                            {
                              [Op.gte]: clusterPosts * 1000, // Multiply by 1000 to account for three-digit prefixes
                            },
                            {
                              [Op.lt]: (clusterPosts + 1) * 1000, // Multiply by 1000 and add 1 for the upper limit
                            },
                          ],
                    },
                    status: statusFilter.status ? statusFilter.status: {[Op.ne]: null}
                },
                order: [['status', 'ASC']], //to have the pending packges first
            });

            var pending = 0;

            packages.forEach(package => {

                if (package.dataValues.status == Status.PENDING){
                    pending +=1;
                }
                //we have diplay for each package where belongs and the status of each one
                driverPackages.push({
                            driver: driver.name,
                            voucher: package.dataValues.voucher,
                            postcode: package.dataValues.postcode,
                            status: package.dataValues.status
                })
                    
            });
            //find which drivers have take all the packages and are ready
            if (pending==0 && filter != Status.SCANNED){
                ready.push({
                    name: driver.name
                })
            }
        };
        res.status(200).json(
            {
                message: 'Packages and drivers who are ready!', 
                packages: driverPackages, 
                readyDrivers: ready
            });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    } 
};