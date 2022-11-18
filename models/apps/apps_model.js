//created on 14/11/22 13:12:33

//created by Yash chowdhari 
//Email :- yashc1999@gmail.com
//appnetic_api


// import {INTEGER} from "sequelize/types/data-types";

const joi = require('joi');
const {Sequelize, DataTypes} = require('sequelize');
const dbs = require('../../db/db_connect')
var alll_apps = dbs.define('app', {


    app_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    app_desc: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    app_screenshots: {
        type: DataTypes.JSON,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, app_data: {
        type: DataTypes.JSON,
        allowNull: false
    }, git_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    snack_code: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
    // Other model options go here
});
console.log(alll_apps === dbs.models.app); // true


alll_apps.createe = joi.object({
    app_name: joi.string().required(),
    app_desc: joi.string().required(),
    app_screenshots: joi.string().required(),
    owner_id: joi.number().required(),
    app_data: joi.object().required(),
    git_url: joi.string().required(),
    snack_code: joi.string().required(),


});

alll_apps.singleapp = joi.object({
    app_id: joi.number().required()
});


module.exports = alll_apps;