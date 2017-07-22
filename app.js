var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser');
    
app.use(bodyParser.urlencoded({extended: true}));    
app.set('view engine', 'ejs');

//LANDING page
app.get('/', function(req, res){
    res.render('landing');
});

var photos = [
    {name: "Hangzhou", image: "http://photo.goroh.co/wp-content/uploads/2017/02/DSC_2751.jpg"},
    {name: "Shanghai", image: "http://photo.goroh.co/wp-content/uploads/2017/02/DSC_3899.jpg"},
    {name: "Nepal", image: "http://photo.goroh.co/wp-content/uploads/2017/02/DSC_8829.jpg"}
];


// SHOW all photos
app.get('/photos', function(req, res){
    res.render('photos', {photos: photos});
});

// CREATE  new photo
app.post('/photos', function(req, res){
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var newPhoto = { name: name, image: image }
    // add to photos array
    photos.push(newPhoto);
    // redirect back to photos page
    res.redirect('/photos');
});

// SUBMIT new photo
app.get('/photos/new', function(req, res){
    res.render('new');
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server started');
})