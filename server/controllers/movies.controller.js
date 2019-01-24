var express = require('express');
var router = express.Router();
var MovieSchema = require('../models/movie');
var ReviewSchema  = require('../models/review');

//Read all movies from database, sorting them alphabetically
router.get('/', function(req, res, next) {
  if(req.query.sort){
    var query = MovieSchema.find().sort( req.query.sort );
    query.exec(function (err, MovieSchema) {
      if (err) return next(err);
      res.send(MovieSchema);
    });  
  } else {
    MovieSchema.find(function(err,MovieSchema){
      if (err) { return next(err); }
      res.json({"Movies" : MovieSchema})
      res.status(200);
  });
}});

//Read a movie from database
router.get('/:id', function(req, res, next) {
	MovieSchema.findById(req.params.id, function (err, MovieSchema) {
		if (err) { return next(err); }
		res.status(200).json({"data":MovieSchema});
	});
});

// GET / User / Read all reviews
router.get('/:id/reviews', function(req, res, next) {
  ReviewSchema.find({ Movie: req.params.id}, function(err, reviews) {
    if (err) { return next(err); }
    res.status(200).json({"data": reviews});
  });
});

router.post('/:id/review', function (req, res, next){
    var review = new ReviewSchema(
        {
            Rating: req.body.Rating,
            ReviewText: req.body.ReviewText,
            Movie: req.params.id,
            Username: req.body.Username
        }
    );
    review.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).json({"reivew": review.id});
    });
});

module.exports = router;
