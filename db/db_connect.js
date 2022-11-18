//created on 14/11/22 20:50:44

//created by Yash chowdhari 
//Email :- yashc1999@gmail.com
//appnetic_api
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('appnetic', 'root', '', {
    host: 'localhost',
    dialect:"mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize