var express = require('express');
var router = express.Router();

const geolocationService = require('../service/geolocation.service');

router.get('/', (req, res) => {
  geolocationService.getAllGeolocations((geolocations) => {
    res.send(geolocations);
  });
});

router.post('/', (req, res) => {
  var geolocation = req.body;
  geolocationService.createGeolocation(geolocation, (err, result) => {
    if (err) return res.status(400).send(err);
    res.send(result);
  });
});

router.post('/near', (req, res) => {
  var currentLocation = req.body;
  geolocationService.getNearGeolocations(currentLocation, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

router.post('/closest', (req, res) => {
  var currentLocation = req.body;
  geolocationService.getClosestGeolocation(currentLocation, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

router.put('/', (req, res) => {
  var geolocation = req.body;
  geolocationService.updateGeolocation(geolocation, (err, result) => {
    if (err) return res.status(400).send(err);
    res.send(result);
  });
});

router.delete('/:id', (req, res) => {
  var id = req.params.id;
  geolocationService.deleteGeolocation(id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

module.exports = router;
