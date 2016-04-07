var should = require('should');
var io     = require('socket.io-client');
var server = require('../app');

describe("social-stream-monitor",function(){

  it('Should get username and message',function(done){
    // socket.ioでmsgを受け取れるかどうかのテスト
    var client = io.connect('http://localhost:3000', {
      transports: ['websocket'],
      'force new connection': true
    });
    client.on('msg', function(msg){
      msg.should.have.property('username', 'John');
      client.disconnect();
      done();
    });
  });

  // httpで接続できるかのテスト
  it("returns status 200", function() {
    request('http://localhost:3000/httpsns', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
    });
  });

});
