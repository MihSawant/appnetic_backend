//created on 07/11/22 11:13:46

//created by Yash chowdhari 
//Email :- yashc1999@gmail.com
//appnetic_api

const mysql = require("mysql2");

// Creating connection
let db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "appnetic",
    dateStrings: true
});

// Connect to MySQL server
db_con.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
    } else {
        console.log("connected to Database");
    }
});

module.exports = db_con