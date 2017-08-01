var express     = require('express');
var router      = express.Router();
var Photo       = require('../models/photo');

// INDEX - show all photos
router.get('/', function(req, res){
    //Get photos from DB
    Photo.find({}, function(err, allPhotos){
        if(err) {
            console.log(err);
        } else {
            res.render('photos/index', {photos: allPhotos});
        }
    });
});


// CREATE - new photo
router.post('/', isLoggedIn, function(req, res){
    // get data from form
    var name      = req.body.name;
    var image     = req.body.image;
    var desc      = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newPhoto  = { name: name, image: image, desc: desc, author: author };
    // create new photo and save it to DB
    Photo.create(newPhoto, function(err, newPhoto){
        if(err){
            console.log(err);
            res.redirect('/photos/new');
        } else {
            res.redirect('/photos');
        }
    });
});

// NEW - submit new photo
router.get('/new', isLoggedIn, function(req, res){
    res.render('photos/new');
});

// SHOW - show more info about single photo
router.get('/:id', function(req, res){
    Photo.findById(req.params.id).populate('comments').exec(function(err, foundPhoto){
        if(err) {
            console.log(err);
            res.redirect('/photos');
        } else {
            res.render('photos/show', {photo: foundPhoto});
        }
    });
});


//EDIT photos route
router.get('/:id/edit', function(req, res){
    Photo.findById(req.params.id, function(err, foundPhoto){
        if(err){
            res.redirect('/photos');
        } else{
            res.render('photos/edit', {photo: foundPhoto});
        }
    });
});


// UPDATE photos route
router.put('/:id', function(req, res){
    Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, updatedPhoto){
        if(err){
            res.redirect('photos');
        } else {
                res.redirect('/photos/' + req.params.id);
        }
    });
});


//DELETE photo route
router.delete('/:id', function(req, res){
   Photo.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect('/photos');
       } else {
           res.redirect('/photos');
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