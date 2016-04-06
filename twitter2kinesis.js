var AWS = require('aws-sdk');
var twitter = require('ntwitter');
var options = retuire('./config/setting.json');
AWS.config.loadFromPath('./config/aws.json');
var kinesis = new AWS.Kinesis();

var tw = new twitter({
  consumer_key: options.twitter_consumer_key,
  consumer_secret: options.twitter_consumer_secret,
  access_token_key: options.twitter_access_token_key,
  access_token_secret: options.twitter_access_token_secret
});

tw.stream('statuses/filter', {'track':'amazon'}, function(stream) {
  stream.on('data', function (data) {

    var req = {
               user : {
                 name : data.user.name,
                 profile_image_url : data.user.profile_image_url
               },
               coordinates : data.coordinates,
               text : data.text
    }
    var pt_key = data.user.screen_name;
    var recordParams = {
      Data: JSON.stringify(req),
      PartitionKey: pt_key,
      StreamName: options.streamname
    };

    kinesis.putRecord(recordParams, function(err, data) {
      if (err) {
        console.error(err);
      }
    });
  });
});