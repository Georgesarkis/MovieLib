
var path = require('path');
var express = require('express');
var router = express.Router()

router.get('/api', function(req, res) {
    res.json({"message": "Welcome to your DIT341 backend project!"});
});

// Insert routes below
router.use('/api/movies', require('./movies.controller'));
router.use('/api/reviews', require('./reviews.controller'));
router.use('/api/admin', require('./admin.controller'));

// All other routes redirect to the index.html
router.route('/').get(function (req, res) {
    //res.sendFile(req.app.get('appPath') + '/owner.html');
    res.sendFile(path.resolve(req.app.get('appPath') + '/movie.html'));
});

router.route('/*').get(function (req, res) {
    var relativeAppPath = req.app.get('appPath');
    var absoluteAppPath = path.resolve(relativeAppPath);
    res.sendFile(absoluteAppPath + '/index.html');
});

module.exports = router