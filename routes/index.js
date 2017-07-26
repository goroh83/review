var express     = require('express');
var router      = express.Router();
var passport    = require('passport');
var User        = require('../models/user');

//root route
router.get('/', function(req, res){
    res.render('landing');
});

// register route
router.get('/register', function(req, res){
   res.render('register'); 
});

//sign up logic
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render('register');
       }
       passport.authenticate('local')(req, res, function(){
           res.redirect('/photos');
       });
   }); 
});

// show login form
router.get('/login', function(req, res){
    res.render('login');
}); 

//handling login
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/photos',
        failureRedirect: '/login'
    }), function(req, res){
});

//logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/photos');
});

module.exports = router;