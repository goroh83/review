var express     = require('express');
var router      = express.Router({mergeParams: true});
var Photo       = require('../models/photo');
var Comment     = require('../models/comment');

// comments/new
router.get('/new', isLoggedIn,  function(req, res){
    // find photo by id
    Photo.findById(req.params.id, function(err, photo){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {photo: photo});
        }
    });
});

//comments/create
router.post('/', isLoggedIn, function(req, res){
    //lookup photo using id
    Photo.findById(req.params.id, function(err, photo){
        if(err){
            console.log(err);
            res.redirect('/photos');
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    photo.comments.push(comment);
                    photo.save();
                    res.redirect('/photos/' + photo._id);
                }
            });
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;