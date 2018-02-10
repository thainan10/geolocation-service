var config = {};

config.database = { url: {} };

config.database.url.development = 'mongodb://admin:admin@ds115071.mlab.com:15071/geolocation-message';
config.database.url.test = 'mongodb://localhost/geolocation-test';

config.application_port = 3000;
config.km_limit = 100;

module.exports = config;
