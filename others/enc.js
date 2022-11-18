//created on 07/11/22 19:35:37

//created by Yash chowdhari 
//Email :- yashc1999@gmail.com
//appnetic_api

var bcrypt = require('bcryptjs');

exports.cryptPassword = function(password) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return err;
        }else{
            bcrypt.hash(password, salt, function(err, hash) {
            return hash;
        });}


    });
};

exports.comparePassword = function(plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
};

