const express = require('express');
const auth = require('../controller/auth');


const router = express.Router();

exports.login = router.post('/login',auth.getlogindetails);

exports.siginUp = router.post('/signup',auth.getSignUpDetails);

exports.profile = router.get('/profile',(req,res,next) => {
    res.render('profile',{
        isAuthenticated: req.session.isLoggedIn
      });
});


exports.clubs = router.get('/clubs',(req,res,next) => {
    res.render('clubs',{
        isAuthenticated: req.session.isLoggedIn
      });
})
exports.about = router.get('/about',(req,res,next) => {
    res.render('about',{
        isAuthenticated: req.session.isLoggedIn
      });
})
exports.clubsSingle = router.get('/club-single',(req,res,next) => {
    res.render('club-single',{
        isAuthenticated: req.session.isLoggedIn
      });
})
exports.contact = router.get('/contact',(req,res,next) => {
    res.render('contact',{
        isAuthenticated: req.session.isLoggedIn
      });
})
exports.events = router.get('/events',(req,res,next) => {
    res.render('events',{
        isAuthenticated: req.session.isLoggedIn
      });
})
exports.eventSingle = router.get('/event-single',(req,res,next) => {
    res.render('event-single',{
        isAuthenticated: req.session.isLoggedIn
      });
})
exports.noticeSingle = router.get('/notice-single',(req,res,next) => {
    res.render('notice-single',{
        isAuthenticated: req.session.isLoggedIn
      });
})
exports.notice = router.get('/notice',(req,res,next) => {
    res.render('notice',{
        isAuthenticated: req.session.isLoggedIn
      });
})

exports.index = router.get('/index',(req,res,next) => {
    res.render('index',{
        isAuthenticated: req.session.isLoggedIn
      });
})

exports.index = router.get('/',(req,res,next) => {
    res.render('index',{
        isAuthenticated: req.session.isLoggedIn
      });
})

