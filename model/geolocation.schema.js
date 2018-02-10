var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var geolocationSchema = new Schema({
  latitude: { type: Number, required: true, min: -90, max: 90 },
  longitude: { type: Number, required: true, min: -180, max: 180 },
  message: { type: String, required: true },
}, { versionKey: false });


module.exports = mongoose.model('geolocations', geolocationSchema);
