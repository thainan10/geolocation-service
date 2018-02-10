const geolocationModel = require('../model/geolocation.model');
const geolocationHelper = require('../helper/geolocation.helper');

const kmDistanceLimit = require('../config/settings').km_limit;

exports.getAllGeolocations = (callback) => {
  geolocationModel.findAll((result) => {
    return callback(result);
  });
};

exports.getNearGeolocations = (currentLocation, callback) => {
  if (!geolocationHelper.validateGeolocationWithoutMessage(currentLocation)) return callback('Invalid location to search');
  geolocationModel.findAll((result) => {
    if (result.length <= 0) return callback('There are no geolocations registered in the server');
    const geolocations = geolocationHelper.wrapGeolocations(result);
    const nearLocations = geolocationHelper.getUpToKmGeolocations(geolocations, currentLocation, kmDistanceLimit);
    return callback(null, nearLocations);
  });
};

exports.getClosestGeolocation = (currentLocation, callback) => {
  if (!geolocationHelper.validateGeolocationWithoutMessage(currentLocation)) return callback('Invalid location to search');
  geolocationModel.findAll((result) => {
    if (result.length <= 0) return callback('There are no geolocations registered in the server');
    const geolocations = geolocationHelper.wrapGeolocations(result);
    const closestLocation = geolocationHelper.getClosestGeolocation(geolocations, currentLocation);
    return callback(null, closestLocation);
  });
};

exports.createGeolocation = (geolocation, callback) => {
  if (!geolocationHelper.validateGeolocation(geolocation)) return callback('Invalid Geolocation');
  geolocationModel.save(geolocation, (result) => {
    return callback(null, result);
  });
};

exports.updateGeolocation = (geolocation, callback) => {
  if (!geolocationHelper.validateGeolocation(geolocation, true)) return callback('Invalid Geolocation');
  geolocationModel.update(geolocation, (result) => {
    return callback(null, result);
  });
};

exports.deleteGeolocation = (id, callback) => {
  geolocationModel.delete(id, (err, result) => {
    if (err) return callback(err);
    return callback(null, result);
  });
};
