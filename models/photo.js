var mongoose    = require('mongoose');



// SCHEMA SETUP
var photoSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

//compile into a model
module.exports = mongoose.model('Photo', photoSchema);