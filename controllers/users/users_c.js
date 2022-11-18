//created on 07/11/22 11:15:01
//created by Yash chowdhari 
//Email :- yashc1999@gmail.com
//appnetic_api

var bcrypt = require("bcryptjs");
const app = require('express');
const db = require('../../db/db_conn');
const User = require('../../models/users/users_model');
const joi = require('joi');
const enc = require('../../others/enc');
const con = require('../../others/configs')
const jwt = require('jsonwebtoken');
const func = require("../../others/functions")
User.register_user = async (req, res, next) => {

    try {
        const value = User.User_registers.validate(req.body);

        if (value.error) {
            res.json({"erorr": true, "message": value.error.message});
        } else {
            const salt = await bcrypt.genSalt(10);
            //step 1
            // encrypt passsword
            var pwd = await bcrypt.hash(req.body.password, salt);
            db.query("select count(*) as c from user where email_id = ?", req.body.email_id, function (err, ress) {
                if (err) {

                    res.json({"error": true, "message": err.message});
                } else if (ress[0].c > 0) {
                    res.json({"error": true, "message": "User exists"});
                } else {

                    //create user
                    var data = {
                        "first_name": req.body.first_name,
                        "last_name": req.body.last_name,
                        "email_id": req.body.email_id,
                        "contact_no": 1111111111,
                        "password": pwd,
                        "data": '{}',
                        "profile_pic": "default.jpg",
                        "dob": "1999-12-18",
                        "user_name": req.body.user_name,
                        "package_id": 0
                    };

                    db.query("INSERT INTO user set ?", data, function (errr, resss) {
                        if (errr) {

                            res.json({"error": true, "message": errr.message})
                        } else {

                            var token = jwt.sign(
                                {userId: resss.insertId},
                                con.secret,
                                {expiresIn: "7d"}
                            );
                            res.json({
                                "error": false, "token": token
                            });
                        }

                    })


                }


            })


        }

    } catch (err) {
        console.log(err);
    }

};
User.login = (req, resp) => {
    //TODO: schema valida

    const schema = User.USer_login.validate(req.body);

    db.query("SELECT count(*) as c from user where email_id = ?", req.body.email, function (err, res) {
        if (err) {
            res.json({"error": true, "message": err.message});
        } else if (res[0].c > 0) {
            //user found
            db.query("SELECT password as p from user where email_id = ?", req.body.email, async function (err1, res1) {

                if (err1) {
                    resp.json({"error": true, "message": err1.message});
                } else {
                    //check password
                    // console.log(res1)
                    const validPassword = await bcrypt.compare(req.body.password, res1[0].p);

                    if (validPassword) {

                        db.query('SELECT id as uid ,first_name,last_name,user_name,email_id from user where email_id = ?', req.body.email, async function (err2, rea) {
                            if (err2) {
                                resp.json({"error": true, "message": err2.message});
                            } else {
                                var token = jwt.sign(
                                    {userId: rea[0].uid},
                                    con.secret,
                                    {expiresIn: "7d"}
                                );

                                resp.json({
                                    "error": false, "token": token, user_info: {
                                        "first_name": rea[0].first_name,
                                        "last_name": rea[0].last_name,
                                        "email": rea[0].email_id,
                                        "user_name": rea[0].user_name

                                    }
                                });
                            }
                        })
                    } else {
                        resp.json({"error": true, "message": "Email or Password Invalid"});
                    }


                }

            });

        } else {
            resp.json({"error": true, "message": "User Not Found"});
        }
    })

};

User.check_username = (req, resp) => {

    const schema = User.user_name_check.validate(req.body);
    db.query("SELECT count(user_name) as u from user where user_name = ?", req.body.user_name, function (err, res) {

        if (err) {
            resp.json({"error": true, "message": err.message});
        } else {
            if (res[0].u > 0) {
                resp.json({"error": true, "message": "Username already Exists"});
            } else {
                resp.json({"error": false, "message": "OK"});
            }
        }

    })

}


User.check_jwt = (req, res) => {
    const token = req.headers.authorization;

    const decodedToken = jwt.verify(token, con.secret);
    // res.status(200).json({success:true, data:{userId:decodedToken.userId,
    //         email:decodedToken.email},);

    res.json({"valid": true, "userid": decodedToken.userId})
}


User.get_info = (req, res) => {


    var c = func.jwtdecode(req, res);


    db.query("SELECT COUNT(*) as c from user where id= " + c.userId, function (dberr, dbres) {
        if (dberr) {
            console.log(dberr);
        } else {
            if (dbres[0].c <= 0) {
                //don't allow to create apps
                res.json({"error": true, "message": "User Not Found"})
            } else {


                db.query("SELECT email_id,contact_no,data,profile_pic,dob,user_name  from user where id = " + c.userId, function (dberr1, dbres1) {
                    if (dberr1) {
                        console.log(dberr1);
                    } else {
                        if (dbres[0].c <= 0) {
                            //don't allow to create apps
                            res.json({"error": true, "message": "User Not Found"})
                        } else {
                            res.send(dbres1[0]);
                        }
                    }

                });
            }
        }

    });

}
module.exports = {
    User

}



