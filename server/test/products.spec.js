const request = require('supertest');
const assert = require('assert');

const server = require('../app');
const key = ""

jest.setTimeout(20000);

describe('getting products list from server', () => {
  it(' getting status code 200 for fetching products from server ', (done) => {
    request(server)
      .get('/api/getProducts')
      .set('Content-type', 'application/json')
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });

  it(' fetching products from server ', (done) => {
    request(server)
      .get('/api/getProducts')
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.text.length > 0, true);
          return done();
        }
      });
  });
});

describe('getting Otp for validation', () => {
  it(' getting status code 200 for fetching OTP', (done) => {
    request(server)
      .post('/api/getOTP')
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });

  it(' fetching OTP from server ', (done) => {
    request(server)
      .post('/api/getOTP')
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(typeof res.text, 'string');
          return done();
        }
      });
  });
});

describe('getting orderId for order placement', () => {
  it(' getting status code 200 for fetching orderid from server ', (done) => {
    request(server)
      .get('/api/orderId')
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.status, 200);
          return done();
        }
      });
  });

  it(' fetching orderid from server ', (done) => {
    request(server)
      .get('/api/orderId')
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(typeof res.text, 'string');
          return done();
        }
      });
  });
});

describe('Confirming order of the user', () => {
  it(' getting confirmation message ', (done) => {
    request(server)
      .post('/api/confirmOrder')
      .end((err, res) => {
        if (err) return done();
        else {
          assert.equal(res.text, 'order details shared to the user');
          return done();
        }
      });
  });
});
