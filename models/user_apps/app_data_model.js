const joi = require("joi")

const app_data_model  = function(app_data) {
    this.app_name = app_data.app_name;
    this.app_icon = app_data.app_icon
}

// const app_data_model_create = joi.object({

// })