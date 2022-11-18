//created on 08/11/22 17:15:08

//created by Yash chowdhari 
//Email :- yashc1999@gmail.com
//appnetic_api
//ua_id	app_id	user_id	app_data	snack_code	app_status

const joi = require("joi");

const user_apps_model = function (user_apps) {
    this.ua_id = user_apps.ua_id;
    this.app_id = user_apps.app_id;
    this.user_id  = user_apps.user_id;
    this.app_data =  user_apps.app_data;
    this.snack_code = user_apps.snack_code;
    this.app_status = user_apps.app_status;
}

const user_app_create = joi.object({
    "app_id":joi.number().required(),
    "app_data":joi.string().required(),
    "app_status" : joi.string().required()
});
const user_app_update = joi.object({
    "ua_id":joi.number().required(),
    "app_id":joi.number().required(),
    "app_data":joi.string().required(),
    "snack_code":joi.string().required(),
    "app_status" : joi.string().required()
});
const user_app_delete =joi.object({
    "ua_id":joi.number().required(),
    "app_id":joi.number().required()
});

module.exports = {
    user_apps_model,
    user_app_create,
    user_app_update,
    user_app_delete
}