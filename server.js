const express = require('express');
const port = 8090;
const app = express();
const users = require('./controllers/users/users_c');
const  db = require('./db/db_conn');var cors = require('cors')
const aapps = require('./controllers/apps/apps_controller');
const user_apps = require('./controllers/user_apps/user_apps_c')


app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/user/register',users.User.register_user);
app.post('/user/login',users.User.login);
app.post('/user/username_check',users.User.check_username);
app.post('/user/token',users.User.check_jwt);

app.get('/user/get/info',users.User.get_info);
//APPS USERS

app.post('/user/app/create',user_apps.user_apps.create);
app.get('/user/apps',user_apps.user_apps.get);
app.post('/user/app',user_apps.user_apps.update);
app.delete('/user/app',user_apps.user_apps.delete);
app.get('/user/app',user_apps.user_apps.getsingle);





//ALL APPS

app.get('/apps/get/all',aapps.aapps.getAll);
app.post('/apps/create/',aapps.aapps.createnewapp);

// Delete By Owner Id
app.delete('/user/app/delete/:id', aapps.aapps.delByOwnerId);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})