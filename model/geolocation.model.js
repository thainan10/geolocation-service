const Geolocation = require('./geolocation.schema');

exports.findAll = (callback) => {
  Geolocation.find((err, result) => {
    if (err) return console.log(err);
    return callback(result);
  });
};

exports.save = (geolocation, callback) => {
  var newGeolocation = new Geolocation();
  Object.assign(newGeolocation, geolocation);
  newGeolocation.save((err) => {
    if (err) return console.log(err);
    return callback(newGeolocation);
  });
};

exports.update = (geolocation, callback) => {
  Geolocation.findById(geolocation._id, (err, result) => {
    if (err) return callback(err);
    if (result) {
      Object.assign(result, geolocation);
      return result.save((err) => {
        if (err) return callback(err);
        return callback(result);
      });
    }
    return callback('There is no geolocation with this id: ' + geolocation._id);
  });
};

exports.delete = (id, callback) => {
  Geolocation.findById(id, (err, result) => {
    if (err) return callback(err);
    if (result) {
      return result.remove((error) => {
        if (error) return callback(error);
        return callback(null, result);
      });
    }
    return callback('There is no geolocation with this id: ' + id);
  });
};
