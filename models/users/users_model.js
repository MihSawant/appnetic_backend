const joi = require('joi');
const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../db/db_connect')
var User = function (user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email_id = user.email_id;
    this.data = user.data;
    this.profile_pic = user.profile_pic;
    this.dob = user.dob;
    this.user_name = user.user_name;
    this.package_id = user.package_id == null ? 0 : user.package_id;
    this.password = user.password;
    this.created_at = new Date();
    this.updated_at = new Date();

};


const User_registers =  joi.object({
    "first_name" : joi.string().max(255).required(),
    "last_name":joi.string().max(255).required(),
    "email_id":joi.string()
    .email().required(),
    "date_birt":joi.date(),
    "user_name":joi.string().required(),
    "password":joi.string().required()
});

const USer_login = joi.object({
    "email":joi.string().email().required(),
    "password":joi.string().required()
});

const user_name_check = joi.object({
   "user_name":joi.string().required()
});
module.exports = {

    User,User_registers,USer_login,user_name_check
};

