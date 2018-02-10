const mongoose = require('mongoose');

const settings = require('./settings');
const url = settings.database.url;

var db;

exports.connect = (environment, done) => {
  const dbUrl = url[environment];
  mongoose.connect(dbUrl, (err, res) => {
    if (err) return done(err);
    done();
  });
};
