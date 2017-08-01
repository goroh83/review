var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    passport            = require('passport'),
    LocalStrategy       = require('passport-local'),
    methodOverride      = require('method-override'),
    Photo               = require('./models/photo'),
    Comment             = require('./models/comment'),
    User                = require('./models/user'),
    seedDB              = require('./seeds'),
    mongoose            = require('mongoose');
    mongoose.Promise    = global.Promise;

// requring routes
var commentRoutes   = require('./routes/comments'),
    photoRoutes     = require('./routes/photos'),
    indexRoutes     = require('./routes/index');

mongoose.connect("mongodb://localhost/review", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));    
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
// seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'Peter is bald',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use('/photos', photoRoutes);
app.use('/photos/:id/comments', commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server started');
})