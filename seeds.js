var mongoose    = require('mongoose'),
Photo           = require('./models/photo'),
Comment         = require('./models/comment'); 

var data = [
        {
            name: "Hangzhou", 
            image: "http://photo.goroh.co/wp-content/uploads/2017/02/DSC_2751.jpg",
            desc: "Beautiful sunset over West Lake in Hangzhou. Spectacular views!"
        },
        {
            name: "Shanghai", 
            image: "http://photo.goroh.co/wp-content/uploads/2017/02/DSC_3899.jpg",
            desc: "Early sunset over Pudong- financial/business district of Shanghai. Photograph taken around 4.30am"
        },
        {
            name: "Nepal", 
            image: "http://photo.goroh.co/wp-content/uploads/2017/02/DSC_8829.jpg",
            desc: "Mustang Valley under Thorung La Pass. In the background Upper Mustang."
        }
];


function seedDB(){
       Photo.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log('removed photos!');
        //add some photos
        data.forEach(function(seed){
            Photo.create(seed, function(err, photo){
                if(err) {
                    console.log(err);
                } else {
                    console.log('added a photo');
                    // add some comments
                    Comment.create(
                        {
                            text:'Cool pic!',
                            author: 'Homer'
                    }, function(err, comment){
                        if(err) {
                            console.log(err);
                        } else {
                        photo.comments.push(comment);
                        photo.save();
                        console.log('created new comment');
                        }
                    });
                }
            });
        });    
    }); 
}

module.exports = seedDB;
