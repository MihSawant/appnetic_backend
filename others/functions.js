//created on 08/11/22 17:24:04

//created by Yash chowdhari 
//Email :- yashc1999@gmail.com
//appnetic_api


const jwt = require("jsonwebtoken");
const con = require('../others/configs')
const db = require('../db/db_conn')
const jwtdecode = function (req, res) {
    const token = req.headers.authorization;

    const decodedToken = jwt.verify(token, con.secret);

    return decodedToken;

}
const checkuser = function (uid, res) {

    db.query("SELECT COUNT(*) as c from user where id=?", uid, function (dberr, dbres) {

        if (dberr) {
            res.json({"error": true, "message": dberr.message});
        } else {

            i = dbres[0].c;
        }


    });

}
const getuserrole = function (uid, res,role) {

    db.query("SELECT COUNT(*) as c from user where id=?", uid, function (dberr, dbres) {

        if (dberr) {
            res.json({"error": true, "message": dberr.message});
        } else {


            i = dbres[0].c;


            if (i > 0) {
                db.query("SELECT roles.role_name , roles.role_permission from user_role  INNER JOIN roles ON  user_role.role_id = roles.id where user_role.user_id = " + uid, function (dberr1, dbres1) {

                    if (dberr1) {
                        res.json({"error": true, "message": dberr1.message});
                    } else {


                        return role(dbres1[0]);

                    }
                });
            } else {
                res.json({"error": true, "message": "User Not found " + uid + i});
            }

        }
    });


}
module.exports = {
    jwtdecode, checkuser, getuserrole
}