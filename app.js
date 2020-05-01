const http = require('http');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyparser = require('body-parser');
const multer = require('multer')
const session = require('express-session');
const mongodb_Session = require('connect-mongodb-session')(session);

app.set('view engine','ejs');
app.set('views','views');

const MONGODB_CONNECT = 'mongodb://localhost:27017/test';

const gest = require('./routs/gest');
const admin = require('./routs/admin');
const head = require('./routs/clubHead')
const store = new mongodb_Session({
url:MONGODB_CONNECT,
collection : 'sessions'
});

var fileStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'\images');
    },
    filename : (req,file,cb) => {
        var date = "hi" ;
        cb(null,file.originalname);
    }
});

var fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

var fields = [
    { name: 'image', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 },
    { name: 'smallBanner', maxCount: 1 },
    { name: 'clubLogo', maxCount: 1 },
    { name: 'clubBanner', maxCount: 1 },
    { name: 'bigBanner', maxCount: 1 }
  ]



app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(multer({storage : fileStorage ,fileFilter : fileFilter}).fields(fields));
app.use(express.static(path.join(__dirname,'public')));
app.use('/images',express.static(path.join(__dirname,'images')));
app.use(session({secret:'my secrate' , resave : false ,saveUninitialized : false , store : store}));

app.use(admin);
app.use(gest);
app.use(head);






const server = http.createServer(app);


mongoose.connect(MONGODB_CONNECT).then(result => {
    app.listen(3000);                
}).catch( err => {
    console.log(err);
});



