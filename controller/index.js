var express = require('express');
var router = express.Router();

var geolocationController = require('./geolocation.controller');

router.use('/geolocations', geolocationController);

module.exports = router;
