//created on 14/11/22 13:10:19

//created by Yash chowdhari 
//Email :- yashc1999@gmail.com
//appnetic_api


const jwt = require('jsonwebtoken');
const db = require('../../db/db_conn');
// const user_apps = require('../../models/user_apps/user_apps_model')
const {getuserrole, jwtdecode} = require("../../others/functions")
const joi = require("joi");
const dbb  = require("../../db/db_connect");

const aapps = require("../../models/apps/apps_model");


aapps.getAll = function (request, response) {
    try {
        var c = jwtdecode(request, response);


         aapps.allApps(request, response);

    } catch (e) {
        response.json({"error": true, "message": e.message});

    }


}


aapps.delByName = function (request, response){
    try{
        aapps.deleteAppByName(request, response);


    }catch (e){
        response.json({"error": true, "message": e.message})
    }
}




aapps.createnewapp = async function (request, response) {
    //TODO : INSERT IMAGE UPLOAD FUNCTION SCREENSHOTS , ICONS, POSTER
    try {
        var token = jwtdecode(request, response);

        user_id = token.userId;


        await getuserrole(user_id, response, async function (r) {

            let role = r.role_name;
            if (role !== "users") {
                response.json({"error": true, "message": "User Is not allowed to create Apps"});
            } else {
                try {
                    var schema = aapps.createe.validate(request.body);

                    if (schema.error) {
                        throw (schema.error)
                    } else {
                        //create app now

                        var data = {
                            app_name: request.body.app_name,
                            app_desc: request.body.app_desc,
                            app_screenshots: request.body.app_screenshots,
                            owner_id: 1,
                            app_data: JSON.stringify(request.body.app_data),
                            git_url: 'NA',
                            snack_code: 'NA'
                        }

                        const app = await aapps.create(data);
                        response.status(200).json({"message": "ok"})

                    }
                } catch (e2) {
                    response.json({"error": true, "message": e2.message});
                }

            }
        });


    } catch (e) {
        response.json({"error": true, "message": e.message});
    }


}

aapps.test = async function (request,res){

    var data = {
        app_name: request.body.app_name,
        app_desc: request.body.app_desc,
        app_screenshots: request.body.app_screenshots,
        owner_id: 1,
        app_data: JSON.stringify(request.body.app_data),
        git_url: 'NA',
        snack_code: 'NA'
    }

    const app = await aapps.create(data);
    res.status(200).json({"message":"ok"})

}

aapps.allApps =  async function (request, response){

    const all = await aapps.findAll();
    response.status(200).json({"message":"ok", "data": all})
}


aapps.deleteAppByName = function (request, response){
    aapps.destroy({
        where:{
            app_name: request.app_name
        }
    });
    response.status(200).json({"message": "ok", "deleted": request.app_name})
}


module.exports = {

aapps
};