const geolib = require('geolib');

exports.validateGeolocation = (geolocation, hasId = false) => {
  var maxAttrLength = (hasId) ? 4 : 3;
  if (hasId && !geolocation._id) return false;
  if (!geolocation.latitude || !geolocation.longitude || !geolocation.message || Object.keys(geolocation).length > maxAttrLength) return false;
  if (!validateLatitude(Number(geolocation.latitude))) return false;
  if (!validateLongitude(Number(geolocation.longitude))) return false;
  return true;
};

exports.validateGeolocationWithoutMessage = (geolocation) => {
  var maxAttrLength = 2;
  if (!geolocation.latitude || !geolocation.longitude || Object.keys(geolocation).length > maxAttrLength) return false;
  if (!validateLatitude(Number(geolocation.latitude))) return false;
  if (!validateLongitude(Number(geolocation.longitude))) return false;
  return true;
};

exports.getUpToKmGeolocations = (geolocations, currentLocation, km) => {
  return geolocations.filter(geolocation => calculateKmDistance(currentLocation, geolocation) <= km);
};

exports.getClosestGeolocation = (geolocations, currentLocation) => {
  var distances = geolocations.map(geolocation => calculateKmDistance(currentLocation, geolocation));
  const index = distances.indexOf(Math.min(...distances));
  return geolocations[index];
};

exports.wrapGeolocations = (geolocations) => {
  return geolocations.map((geolocation) => {
    ({ latitude, longitude, message } = geolocation);
    return { latitude, longitude, message };
  });
};

validateLatitude = (latitude) => {
  return (typeof latitude === 'number' && latitude >= -90 && latitude <= 90) ? true : false;
};

validateLongitude = (longitude) => {
  return (typeof longitude === 'number' && longitude >= -180 && longitude <= 180) ? true : false;
};

fromMeterToKilometer = (meters) => {
  return meters / 1000;
};

calculateKmDistance = (geolocation1, geolocation2) => {
  return fromMeterToKilometer(geolib.getDistance(geolocation1, geolocation2));
};
