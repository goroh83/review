// all the middleware
var Photo           = require('../models/photo');
var Comment         = require('../models/comment');


var  middlewareObj = {};
    
middlewareObj.checkCommentAuth = function(req, res, next) {
     if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else{
                // if user owns the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash('error', "You don't have permission to do that.");
                    res.redirect('back');
                }
            }
        });
     } else {
         req.flash('error', 'You need to be loggged in to do that.');
         res.redirect('back');
     }
};

middlewareObj.checkPhotoAuth = function(req, res, next) {
     if(req.isAuthenticated()) {
        Photo.findById(req.params.id, function(err, foundPhoto){
            if(err){
                req.flash('error', "Photo not found");
                res.redirect('back');
            } else{
                // if user owns the photo
                if(foundPhoto.author.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash('error', "You don't have permission to do that");
                    res.redirect('back');
                }
            }
        });
     } else {
         req.flash('error', 'You need to be loggged in to do that.');
         res.redirect('back');
     }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that.')
    res.redirect('/login');
};


module.exports = middlewareObj;