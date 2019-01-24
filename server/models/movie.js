var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    ReleaseYear : { type: Number },
    MovieTitle : { type: String },
	PlotDescription : { type: String },
	Director  : { type: String },
	Trailer: { type: String },
	MainPoster : { type: String },//[{data: Buffer, contentType: String }],
	MainActors :  [{type : String}]
});

module.exports = mongoose.model('Movies', MovieSchema);