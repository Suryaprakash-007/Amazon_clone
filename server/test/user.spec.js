const request = require('supertest');
const assert = require('assert');
const userModel = require('../api/user/user.model');
const chai = require('chai');
let should = chai.should();
const config = require('./test.config')

const server = require('../app');

jest.setTimeout(20000);

// Logging in user
describe('Getting user during login', () => {
  it('getting status code 200 for fetching user from server ', (done) => {
    request(server)
      .post('/api/signIn')
      .set('Content-type', 'application/json')
      .send(config.user1)
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });

  it('getting API token  during login', (done) => {
    request(server)
      .post('/api/signIn')
      .set('Content-type', 'application/json')
      .send(config.user1)
      .end((err, res) => {
        if (err) return done();
        else {
          res.body.should.be.a('object');
          return done();
        }
      });
  });
});

// Registring user
describe('Adding user to DB', () => {
  it('Adding user to DB', (done) => {
    
    request(server)
      .post('/api/signUp')
      .set('Content-type', 'application/json')
      .send(config.register1)
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });

 
});
