var express     = require('express');
var router      = express.Router({mergeParams: true});
var Photo       = require('../models/photo');
var Comment     = require('../models/comment');
var middleware      = require('../middleware/index.js');

// comments/new
router.get('/new', middleware.isLoggedIn,  function(req, res){
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
router.post('/', middleware.isLoggedIn, function(req, res){
    //lookup photo using id
    Photo.findById(req.params.id, function(err, photo){
        if(err){
            console.log(err);
            req.flash('error', "Ooops! Something went wrong");
            res.redirect('/photos');
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    req.flash('error', "Ooops! Something went wrong");
                    res.redirect('/photos' + photo._id);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    photo.comments.push(comment);
                    photo.save();
                    req.flash('success', 'Successfully added a new comment.');
                    res.redirect('/photos/' + photo._id);
                }
            });
        }
    });
});

// EDIT comment form
router.get('/:comment_id/edit', middleware.checkCommentAuth, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.reidrect('back');
        } else {
            res.render('comments/edit', {photo_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE comment route
router.put('/:comment_id', middleware.checkCommentAuth, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,  function(err, updatedComment){
        if(err) {
            req.flash('error', "Oops! Something went wrong...");
            res.redirect('back');
        } else {
            req.flash('success','Comment updated');
            res.redirect('/photos/' + req.params.id);
        }
    });
});

// DELETE comment route
router.delete('/:comment_id', middleware.checkCommentAuth, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            req.flash('error', "Oops! Something went wrong...");
            res.redirect('back');
        } else {
            req.flash('success', 'Comment deleted.');
            res.redirect('/photos/' + req.params.id);
        }
    });
});

module.exports = router;