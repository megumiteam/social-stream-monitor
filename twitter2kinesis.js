var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.json');
var kinesis = new AWS.Kinesis();
var twitter = require('ntwitter');
var tw = new twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

tw.stream('statuses/filter', {'track':'amazon'}, function(stream) {
  stream.on('data', function (data) {

    var pt_key = data.user.screen_name;
    var recordParams = {
      Data: JSON.stringify(data),
      PartitionKey: pt_key,
      StreamName: ''
    };

    kinesis.putRecord(recordParams, function(err, data) {
      if (err) {
        console.error(err);
      }
    });
  });
});
~   