var express = require('express');
var router = express.Router();

var Review = require('../models/review');

// GET / User / Read review
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Review.findById(req.params.id, function(err, review) {
    if (err) {
      return next(err);
    }
    if (review == null) {
      return res.status(404).json({
        "message": "review not found (User)."
      });
    }
    res.status(200);
    res.json(review);
  });
});



// PUT / User / Update review
router.patch('/:id', function(req, res, next) {
  var id = req.params.id;
  Review.findById(id, function(err, review) {
    if (err) {return next(err);}
    if (review == null) {
      return res.status(404).json({
        "message": "Review not found."
      });
    }
    review.Rating = (req.body.Rating|| review.Rating);
    review.ReviewText = (req.body.ReviewText|| review.ReviewText);
    review.save();
    res.status(200);
    res.json(review);
  });
});


// DELETE one / User / Delete one review
router.delete('/:id', function(req, res){
    Review.findOneAndDelete({_id: req.params.id }, function(err, review) {
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
