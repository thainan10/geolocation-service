process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
const Geolocation = require('../model/geolocation.schema');

const should = chai.should();
chai.use(chaiHttp);

describe('Geolocations', () => {

  beforeEach((done) => {
    const newGeolocation = new Geolocation({
      latitude: 52.519965,
      longitude: 13.328809,
      message: 'Secret Message'
    });

    newGeolocation.save((err) => {
      done();
    });
  });

  afterEach((done) => {
    Geolocation.collection.drop();
    done();
  });

  it('should list ALL geolocations on /geolocations GET', (done) => {
    chai.request(server)
      .get('/geolocations')
      .end((err, res) => {
        const response = res.body[0];
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        response.should.have.property('_id');
        response.should.have.property('latitude');
        response.should.have.property('longitude');
        response.should.have.property('message');
        response.latitude.should.equal(52.519965);
        response.longitude.should.equal(13.328809);
        response.message.should.equal('Secret Message');
        done();
      });
  });

  it('should add a SINGLE geolocation on /geolocations POST', (done) => {
    const object = {
      latitude: 52.51905,
      longitude: 13.334066,
      message: 'Berlin, Germany'
    };
    chai.request(server)
      .post('/geolocations')
      .send(object)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('latitude');
        res.body.should.have.property('longitude');
        res.body.should.have.property('message');
        res.body.latitude.should.equal(object.latitude);
        res.body.longitude.should.equal(object.longitude);
        res.body.message.should.equal(object.message);
        done();
      });
  });

  it('should list ALL near geolocations on /geolocations/near POST', (done) => {
    const object = {
      latitude: 52.360125,
      longitude: 14.541728,
    };
    chai.request(server)
      .post('/geolocations/near')
      .send(object)
      .end((err, res) => {
        const response = res.body[0];
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        response.should.have.property('latitude');
        response.should.have.property('longitude');
        response.should.have.property('message');
        response.latitude.should.equal(52.519965);
        response.longitude.should.equal(13.328809);
        response.message.should.equal('Secret Message');
        done();
      });
  });

  it('should list a SINGLE closest geolocation on /geolocations/closest POST', (done) => {
    const object = {
      latitude: 52.360125,
      longitude: 14.541728,
    };
    chai.request(server)
      .post('/geolocations/closest')
      .send(object)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('latitude');
        res.body.should.have.property('longitude');
        res.body.should.have.property('message');
        res.body.latitude.should.equal(52.519965);
        res.body.longitude.should.equal(13.328809);
        res.body.message.should.equal('Secret Message');
        done();
      });
  });


  it('should update a SINGLE geolocation on /geolocations PUT', (done) => {
    chai.request(server)
      .get('/geolocations')
      .end((err, res) => {
        var object = res.body[0];
        object.latitude += 0.0001;
        object.longitude -= 0.0001;
        object.message = 'Another Message';
        chai.request(server)
          .put('/geolocations')
          .send(object)
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('_id');
            response.body.should.have.property('latitude');
            response.body.should.have.property('longitude');
            response.body.should.have.property('message');
            response.body._id.should.equal(object._id);
            response.body.latitude.should.equal(object.latitude);
            response.body.longitude.should.equal(object.longitude);
            response.body.message.should.equal(object.message);
            done();
          });
      });
  });

  it('should delete a SINGLE geolocation on /geolocations DELETE', (done) => {
    chai.request(server)
      .get('/geolocations')
      .end((err, res) => {
        const object = res.body[0];
        chai.request(server)
          .delete('/geolocations/' + object._id)
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('_id');
            response.body.should.have.property('latitude');
            response.body.should.have.property('longitude');
            response.body.should.have.property('message');
            response.body._id.should.equal(object._id);
            response.body.latitude.should.equal(object.latitude);
            response.body.longitude.should.equal(object.longitude);
            response.body.message.should.equal(object.message);
            done();
          });
      });
  });

});
