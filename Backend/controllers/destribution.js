const { Op } = require('sequelize');
const express = require('express');
const Cluster = require('../models/cluster');
const Driver = require('../models/driver');
const Package = require('../models/package');
const { validationResult } = require('express-validator');

exports.getPickUpPackages = async (req, res, next) => {
    try{
        const join = await Driver.findAll({
            include: [ 
                {
                    model: Cluster,
                    attributes: ['id', 'postcode']
                }
            ],
            attributes: ['name']
        });

        const driverPackages = []
        
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
                    }
                }
            });
            
            packages.forEach(package => {
                driverPackages.push({
                    driver: driver.name,
                    voucher: package.dataValues.voucher,
                    postcode: package.dataValues.postcode,
                    status: package.dataValues.status
                })
            });
        };

        
        // res.status(200).json(join)
        res.status(200).json({
            message: "All ok",
            drivers: driverPackages
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.putScan = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const err = new Error('Validation Failed, entered data is incorrect.');
        //422 for validation error
        err.statusCode = 422;
        return next(err);
    }

    const voucher = req.body.voucher;
    try{
        const scaned = await Package.findByPk(voucher)
        
        if (!scaned){
            const error = new Error(`Item doesn't exist.`);
            error.statusCode = 404;
            throw error;
        }

        if (scaned.dataValues.status == 'SCANNED'){
            const error = new Error(`The item has already scanned!`);
            error.statusCode = 404;
            throw error;
        }

        await Package.update({status: 'SCANNED'}, {
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

exports.getRemainPackages = async (req, res, next) => {
    
    
    
    
    
    try{
        // const unchecked = await Package.findAll({
        //     attributes: ['voucher'],
        //     where: {
        //         status: 'PENDING'
        //     }
        // })

        const join = await Driver.findAll({
            include: [ 
                {
                    model: Cluster,
                    attributes: ['id', 'postcode']
                }
            ],
            attributes: ['name']
        });
    
        const driverPackages = []
        
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
                    status: 'PENDING'
                }
            });
            
            packages.forEach(package => {
                driverPackages.push({
                    driver: driver.name,
                    voucher: package.dataValues.voucher,
                    postcode: package.dataValues.postcode,
                    status: package.dataValues.status
                })
            });
        };
        
        res.status(200).json({message: 'Packages have not scan!', packages: driverPackages})
    }catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    } 
};