var mongoose    = require('mongoose');



// SCHEMA SETUP
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

//compile into a model
module.exports = mongoose.model('Comment', commentSchema);