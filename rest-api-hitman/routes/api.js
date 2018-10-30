const express = require('express');
// Router object
const router = express.Router();
const Hitman = require('../models/hitman');
var api = express();

/*
*******************************
ROUTES - Request/Route handlers
*******************************
*/

// GET home page
router.get('/', function(req, res, next) {
  res.render('api', {title: 'Hitman 4 Hire'});
});

// GET Request Handler - Get list of hitmen from the db
router.get('/hitmen', (req, res, next) =>{
  // Query will return a Promise
  Hitman.aggregate([
    {
      $geoNear : {
          near: {
    "type" : "Point",
    "coordinates" : [parseFloat(req.query.long), parseFloat(req.query.lati)]},
    maxDistance : 100000,
    spherical : true, // Radius within 100000 metres of provided coords
    distanceField: "dist.calculated"
  }
}]).then(function(hitmen){
    res.send(hitmen); // Send hitmen within radius back to the client
  }).catch(next);
});


router.get('/hitmen', (req, res, next) => {
  // Mongoose method to find all hitmen
    res.setHeader('Content-Type', 'application/json');
    res.send(hitmen);
  });

// POST Request Handler - Add a new hitman to the db
router.post('/hitmen', function(req, res, next){
  // Create new hitman record/instance using data sent in request body
  // and then save to the db in the hitmans collection
  // Returns a promise (with error catcher)
  Hitman.create(req.body).then(function(hitman){
    // Send JSON repsonse if it was successful
    res.send(hitman);
  }).catch(next); // Call next piece middleware (for error handling)
});

// Update an existing hitman in the db (':id' is like a variable)
router.put('/hitmen/:id', function(req, res, next){
// {new: true} option included to return the updated hitman instead of the original
  Hitman.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function(hitman){
      res.send(hitman); // Respond with updated hitamn
  });
});

// Delete a hitman from the db (by specific id - route parameter)
router.delete('/hitmen/:id', function(req, res, next){
   // Mongoose method
  Hitman.findOneAndDelete({_id: req.params.id}).then(function(hitman){
    res.send(hitman); // Send the hitman that's been removed
  });
});

module.exports = api;
module.exports = router; // Exporting router with routes above mounted
