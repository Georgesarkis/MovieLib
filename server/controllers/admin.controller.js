var express = require('express');
var router = express.Router();
var MovieSchema = require('../models/movie');
var ReviewSchema  = require('../models/review');

// POST / Admin / Create movie
router.post('/movies', function(req, res, next) {
    var movie = new MovieSchema(req.body);
    movie.save(function(err) {
    if (err) {
      return next(err);
    }
      res.status(201).json(movie);
    });
  });
  
  // DELETE / Admin / Delete movie
  router.delete('/movies/:id', function(req, res, next) {
    var id = req.params.id;
    MovieSchema.findOneAndDelete({_id: id}, function(err, movie) {
      if (err) {
        return next(err);
      }
      if (movie == null) {
        return res.status(404).json({
          "message": "Movie deleted by Admin."
        });
      }
      ReviewSchema.deleteMany({Movie : id},function(err){
              if (err) {return next(err);}
          });
      res.json(movie);
    });
  });
  
  // UPDATE / Admin / Update movie attributes
  router.patch('/movies/:id/', function(req, res, next) {
    var id = req.params.id;
    MovieSchema.findById(id, function(err, movie) {
      if (err) { return next(err); }
      if(movie == null) {
        return res.status(404).json(
          {"message": "Movie not found"});
      }
      movie.ReleaseYear = (req.body.ReleaseYear || movie.ReleaseYear);
      movie.MovieTitle = (req.body.MovieTitle || movie.MovieTitle);
      movie.Director = (req.body.Director || movie.Director);
      movie.Trailer = (req.body.Trailer || movie.Trailer);
      movie.MainPoster = (req.body.MainPoster || movie.MainPoster);
      movie.MainActors = (req.body.MainActors || movie.MainActors);
      movie.save();
      res.json(movie);
    });
  });

  // GET / Admin / Read all reviews
router.get('/movies/:id/reviews', function(req, res, next) {
    ReviewSchema.find({ Movie: req.params.id}, function(err, reviews) {
      if (err) { return next(err); }
      return res.status(200).json({"data": reviews});
    });
  });
  
  // DELETE ALL / Admin / Delete all reviews
  router.delete('/movies/:id/reviews', function(req, res, next) {
    ReviewSchema.deleteMany({Movie: req.params.id}, function(err) {
      if (err) {
        return next(err);
      }
          res.status(200).json({"message": "banana"});
    });
  });

  // GET / Admin / Read review
router.get('/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    ReviewSchema.findById(req.params.id, function(err, review) {
      if (err) {
        return next(err);
      }
      if (review == null) {
        return res.status(404).json({
          "message": "review not found (Admin)"
        });
      }
      res.status(200);
      res.json(review);
    });
  });

  // DELETE one / Admin / Delete one review
router.delete('/reviews/:id', function(req, res){
    ReviewSchema.findOneAndDelete({_id: req.params.id }, function(err, review) {
        if(err) { return next(err); }
        if(review == null) {
            return res.status(404).json(
                {"message": "Review not found"});
        }
        res.json(review);
        res.status(200);
    });
  });

  module.exports = router;