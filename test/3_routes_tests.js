var request = require('supertest');

describe('test to see if our routes are responding', function () {
  var app;
  var listeningOnPort;
  beforeEach(function () {
    app = require('../app').app;
    listeningOnPort = require('../app').listeningOnPort;
  });
  afterEach(function () {
    listeningOnPort.close();
  });
  it('responds to /', function test(done) {
    request(listeningOnPort)
    .get('/')
    .expect(200, done);
  });
  it('responds to /mentors', function test(done) {
  request(listeningOnPort)
    .get('/mentors')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(listeningOnPort)
      .get('/foo/bar')
      .expect(404, done);
  });
});
