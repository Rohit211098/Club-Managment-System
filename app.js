const http = require('http');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const mongodb_Session = require('connect-mongodb-session')(session);

app.set('view engine','ejs');
app.set('views','views');

const MONGODB_CONNECT = 'mongodb://localhost:27017/test';

const gest = require('./routs/gest');
const admin = require('./routs/admin');
const store = new mongodb_Session({
url:MONGODB_CONNECT,
collection : 'sessions'
});




app.use(bodyparser.urlencoded());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret:'my secrate' , resave : false ,saveUninitialized : false , store : store}));

app.use(admin);
app.use(gest);






const server = http.createServer(app);


mongoose.connect(MONGODB_CONNECT).then(result => {
    app.listen(3000);c                  
}).catch( err => {
    console.log(err);
});



