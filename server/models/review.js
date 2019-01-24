var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewModel = new Schema({
    Rating: { type: Number, min: 1, max: 5 },
    ReviewText: { type: String },
    Movie: { type: Schema.Types.ObjectId, ref: 'movie'},
    Username: { type: String}
});

// 'reviews' is the collection in the database I have named 'movielib'
module.exports = mongoose.model('reviews', reviewModel);
