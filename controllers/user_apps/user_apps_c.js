//created on 08/11/22 17:19:59

//created by Yash chowdhari 
//Email :- yashc1999@gmail.com
//appnetic_api


const db = require('../../db/db_conn');
const func = require("../../others/functions")

const {Sequlize, where} = require('sequelize');

const user_apps = require("../../models/user_apps/user_apps_model");
const sequelize = require('../../db/db_connect');
const { response } = require('express');



user_apps.create = function (req, res) {


    try {
        const schema = user_apps.user_app_create;
        if (schema.error) {
            throw(schema.error);
        } else {
            var c = func.jwtdecode(req, res);


            db.query("SELECT COUNT(*) as c from user_apps where user_id= " + c.userId + " AND app_id=" + req.body.app_id, function (dberr, dbres) {
                if (dberr) {
                    console.log(dberr);
                } else {
                    if (dbres[0].c > 0) {
                        //don't allow to create apps
                        res.json({"error": true, "message": "Same App Already Exists !"})
                    } else {
                        var data = {
                            "app_id": req.body.app_id,
                            "user_id": c.userId,
                            "app_data": req.body.app_data,
                            "snack_code": null,
                            "app_status": "draft"
                        }
                        db.query('INSERT into user_apps set ? ', data, function (dberr1) {
                            if (dberr1) {
                                throw(dberr1);
                            } else {
                                res.json({"error": false, "message": "App Created Successfully"});
                            }

                        });
                    }
                }
            })
        }

    } catch (r) {
        res.status(419).json({"error": true, "message": r.message})
    }


}

user_apps.get = async function (req, res) {
    //check jwt

    try {
        var jwt = func.jwtdecode(req, res);
        //check if user exists
        db.query("SELECT COUNT(*) as c from user where id=?", jwt.userId, function (dberr, dbres) {

            if (dberr) {
                res.json({"error": true, "message": dberr.message});
            } else {
                if (dbres[0].c > 0) {
                    db.query("SELECT * from user_apps where user_id =?", jwt.userId, function (dberr1, dbres) {

                        if (dberr1) {
                            res.json({"error": true, "message": dberr1.message});
                        } else {
                            res.json({"error" : false , "apps":dbres});
                        }

                    })
                } else {
                    res.json({"error": true, "message": "User Doesn't Exist !"});
                }


            }


        });

    } catch (e) {
        res.status(419).json({"error": true, "message": e.message})
    }
}


user_apps.update = function (req, res) {
    const schema = user_apps.user_app_update.validate(req.body);
    if (schema.error) {
        res.json({"error": true, "message": schema.error})
    } else {
        //check jwt

        try {
            const c = func.jwtdecode(req, res);

            db.query("select count(*) as c from user_apps where ua_id =?", req.body.ua_id, function (dberr, dbres) {

                if (dberr) {
                    res.json({"error": true, "message": dberr.message});
                } else {
                    if (dbres[0].c > 0) {
                        //update app data
                        var data = {
                            "app_id": req.body.app_id,
                            "user_id": c.userId,
                            "app_data": req.body.app_data,
                            "snack_code": req.body.snack_code,
                            "app_status": req.body.app_status,

                        }

                        db.query("update user_apps set  ? where ua_id =" + req.body.ua_id, data, function (dberr1) {
                            if (dberr1) {
                                res.json({"error": true, "message": dberr1.message});
                            } else {
                                res.json({"error": false, "message": "UPDATED"});
                            }

                        })

                    } else {
                        res.json({"error": true, "message": "App Not Found !"});
                    }
                }


            });


        } catch (e) {
            res.status(419).json({"error": true, "message": e.message})
        }

    }


}

user_apps.delete = async function (req, res) {
    //check schema
    const schema = user_apps.user_app_delete.validate(req.body);

    if (schema.error) {
        res.json({"error": true, "message": schema.error})
    } else {
        //check jwt

        try{
          var c = await user_apps.checkForMany(req, res);
          if(c > 0){
            user_apps.deleteAppsByNameAndId(req, res);
            res.status(200).json({"error":false, "message": "App Deleted Successfully"});
          } else{
            res.json({"error": true, "message": "App Not Found!"});
          }
        }catch(e){
            res.status(419).json({"error": true, "message": e.message});
        }

        // try {
        //     db.query("select count(*) as c from user_apps where ua_id=" + req.body.ua_id + " AND app_id=" + req.body.app_id, function (dberr, dbress) {


        //         if (dberr) {
        //             res.json({"error": true, "message": dberr.message});
        //         } else {
        //             if (dbress[0].c > 0) {
        //                db.query("DELETE FROM  user_apps where ua_id=" + req.body.ua_id + " AND app_id=" + req.body.app_id,function (dberr1) {
        //                    if(dberr1){
        //                        res.json({"error": true, "message": dberr1.message});
        //                    }else{
        //                        res.json({"error": false, "message": "Deleted Successfully !"});
        //                    }
        //                })
        //             }else{
        //                 res.json({"error": true, "message": "App Not Found !"});
        //             }
        //         }


        //     });
        // } catch (e) {
        //     res.status(419).json({"error": true, "message": e.message})
        // }
    }
}


user_apps.getsingle =  async function (req,res) {

    const schema = user_apps.user_app_delete.validate(req.body);

    if (schema.error) {
        res.json({"error": true, "message": schema.error})
    } else {
        try{
            var c = await user_apps.checkForMany(req, res);
            if(c > 0){
                res.json({"error": true, "message": "App Already Exists!"});
            } else{
                res.json({"error": true, "message": "App not Found!"});
            }
        }catch(e){
            res.status(419).json({"error": true, "message": e.details});
        }

        //check jwt

        // try {
        //     db.query("select count(*) as c from user_apps where ua_id=" + req.body.ua_id + " AND app_id=" + req.body.app_id, function (dberr, dbress) {


        //         if (dberr) {
        //             res.json({"error": true, "message": dberr.message});
        //         } else {
        //             if (dbress[0].c > 0) {
        //                 db.query("SELECT * FROM  user_apps where ua_id=" + req.body.ua_id + " AND app_id=" + req.body.app_id,function (dberr1,dbress) {
        //                     if(dberr1){
        //                         res.json({"error": true, "message": dberr1.message});
        //                     }else{
        //                         res.json(dbress[0]);
        //                     }
        //                 })
        //             }else{
        //                 res.json({"error": true, "message": "App Not Found !"});
        //             }
        //         }


        //     });
        // } catch (e) {
        //     res.status(419).json({"error": true, "message": e.message})
        // }
    }

   
    
}


user_apps.checkForMany = async function(request, response){
    let count = await  user_apps.all_user_apps.count({
        where:{
            ua_id : request.body.ua_id,
            app_id:  request.body.app_id
           }
     });
     return count;
}

user_apps.findAllDeteilsOfApp = async function(request, response){
    await user_apps.all_user_apps.findAll({
        where:{
            ua_id : request.ua_id,
            app_id: request.app_id   
           }
    });
}

user_apps.deleteAppsByNameAndId = async function(request, response){
    await user_apps.all_user_apps.destroy({
        where:{
            ua_id : request.body.ua_id,
            app_id : request.body.app_id
        }
    });
}


module.exports = {
    user_apps
}