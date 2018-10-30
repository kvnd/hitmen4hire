const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create geolocation Schema (geojson.org) to use in Hitman Schema
const GeolocationSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    // Array of numbers
    type: [Number],
    // Type of map I want to use (2dsphere is more accurate)
    index: "2dsphere"
  }
});

// Create hitman Schema
const HitmanSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field required'] // Won't save to db
  },
  gender: {
    type: String
  },
  hirable: {
    type: Boolean,
    default: false // If nothing is entered
  },
  // TODO: Add in geolocation of hitmen (latitude & longitude)
  geometry: GeolocationSchema
});

// Create hitman model
const Hitman = mongoose.model('hitman', HitmanSchema);

// Export model to use in other files
module.exports = Hitman;
