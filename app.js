var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    mongoose            = require('mongoose');
    mongoose.Promise    = global.Promise;


mongoose.connect("mongodb://localhost/review", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));    
app.set('view engine', 'ejs');


// SCHEMA SETUP
var photoSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
});

//compile into a model
var Photo = mongoose.model('Photo', photoSchema);


//LANDING page
app.get('/', function(req, res){
    res.render('landing');
});

// var photos = [
//     {name: "Hangzhou", image: "http://photo.goroh.co/wp-content/uploads/2017/02/DSC_2751.jpg"},
//     {name: "Shanghai", image: "http://photo.goroh.co/wp-content/uploads/2017/02/DSC_3899.jpg"},
//     {name: "Nepal", image: "http://photo.goroh.co/wp-content/uploads/2017/02/DSC_8829.jpg"}
// ];


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
    Photo.findById(req.params.id, function(err, foundPhoto){
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