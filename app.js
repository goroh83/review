var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    Photo               = require('./models/photo'),
    Comment             = require('./models/comment'),
    User                = require('./models/user'),
    seedDB              = require('./seeds'),
    mongoose            = require('mongoose');
    mongoose.Promise    = global.Promise;

mongoose.connect("mongodb://localhost/review", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));    
app.set('view engine', 'ejs');
seedDB();

//LANDING page
app.get('/', function(req, res){
    res.render('landing');
});


// INDEX - show all photos
app.get('/photos', function(req, res){
    //Get photos from DB
    Photo.find({}, function(err, allPhotos){
        if(err) {
            console.log(err);
        } else {
            res.render('index', {photos: allPhotos});
        }
    });
});

// NEW - submit new photo
app.get('/photos/new', function(req, res){
    res.render('new');
});

// CREATE - new photo
app.post('/photos', function(req, res){
    // get data from form
    var name      = req.body.name;
    var image     = req.body.image;
    var desc      = req.body.desc;
    var newPhoto  = { name: name, image: image, desc: desc };
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

// SHOW - show more info about single photo
app.get('/photos/:id', function(req, res){
    Photo.findById(req.params.id).populate('comments').exec(function(err, foundPhoto){
        if(err) {
            console.log(err);
            res.redirect('/photos');
        } else {
            res.render('show', { photo: foundPhoto});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server started');
})