//created on 07/11/22 20:45:47

//created by Yash chowdhari 
//Email :- yashc1999@gmail.com
//appnetic_api


const express = require('express');
const  userroute = express()
const users = require('../controllers/users/users_c');
userroute.use(express.json());
userroute.post('/user/register',users.User.register_user);
userroute.post('/user/login',users.User.login);
userroute.post('/user/username_check',users.User.check_username);
module.exports = userroute;