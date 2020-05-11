'use strict';
const app = require('../../../app'),
  chai = require('chai'),
  request = require('supertest');

var expect = chai.expect;
describe('API Tests', function () {
  var pet = {
    "name": "pet 1",
    "num_avalible": 3,
    "owner": {
      "id": "1",
      "name": "milad"
    }
  }
  var savedPet = {};
  var petId = null;
  describe('# Get all pets', function () {
    it('should get all pets', function (done) {
      request(app).get('/pet').end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        const response = res.body.pets;
        expect(response).to.be.an('array');
        expect(response).to.be.empty;
        done();
      });
    });
  });

  describe('## Create pet ', function () {
    it('should create a pet', function (done) {
      request(app).post('/pet').send(pet).end(function (err, res) {
        expect(res.statusCode).to.equal(201);
        savedPet = res.body.pet;
        petId = savedPet.id;
        delete savedPet.id;
        expect(savedPet).to.eql(pet)
        done();
      });
    });
  });
  let bids = [{
    "user_id": "1",
    "user_name": "John Doe",
    "amount_money": 100
  },
  {
    "user_id": "2",
    "user_name": "John Smith",
    "amount_money": 500
  },
  {
    "user_id": "3",
    "user_name": "Sara Conor",
    "amount_money": 280
  },
  {
    "user_id": "4",
    "user_name": "Martin Fowler",
    "amount_money": 320
  }]

  describe('# Bid On a pet by pet id', function () {
    it('should bid on a pet', function (done) {
      request(app).put(`/pet/bid/${petId}`).send(bids[0]).end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        const response = res.body;
        expect(response.success).equal(1);
        done();
      });
    });
  });
  describe('# Bid On a pet by pet id', function () {
    it('should bid on a pet', function (done) {
      request(app).put(`/pet/bid/${petId}`).send(bids[1]).end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        const response = res.body;
        expect(response.success).equal(1);
        done();
      });
    });
  });
  describe('# Bid On a pet by pet id', function () {
    it('should bid on a pet', function (done) {
      request(app).put(`/pet/bid/${petId}`).send(bids[2]).end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        const response = res.body;
        expect(response.success).equal(1);
        done();
      });
    });
  });
  describe('# Bid On a pet by pet id', function () {
    it('should bid on a pet', function (done) {
      request(app).put(`/pet/bid/${petId}`).send(bids[3]).end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        const response = res.body;
        expect(response.success).equal(1);
        done();
      });
    });
  });

  describe('# Get a pet with its all Bids', function () {
    it('should get all Bids of one bid', function (done) {
      request(app).get(`/pet/${petId}`).end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        const response = res.body;
        expect(response.bids).to.be.an('array');
        done();
      });
    });
  });

  describe('# Display winners of bid', function () {
    it('should display winners of bid for one pet', function (done) {
      request(app).get(`/pet/winner/${petId}`).end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        const response = res.body;
        console.log(response);
        
        // expect(response.bids).to.be.an('array');
        done();
      });
    });
  });

});