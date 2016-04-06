var http = require('http');
var url = require("url");
var async = require('async');
var AWS = require('aws-sdk');
var options = require('./config/setting.json');
 
AWS.config.loadFromPath('./config/aws.json');
var sns = new AWS.SNS();
 
var httpServer = http.createServer(handler);
var io = require('socket.io').listen(httpServer);
var fs = require('fs');
//asyncを使って順番に処理を実行
async.series([
    //HTTPサーバ起動
    function (callback) {
        httpServer.listen(3000);
        callback(null, 1);
    },
    //subscrive開始
    function (callback) {
        initSubscriber(callback);
        callback(null, 2);
    }
], function (err, results) {
    if (err) {
        throw err;
    }
});
 
function handler(req, res) {
    var path = url.parse(req.url).pathname;
 
    if (path === "/httpsns") {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            res.writeHead(200, {
                'Content-Type':'text/html'
            });
 
            var obj = JSON.parse(body);
            if (obj.Type === "SubscriptionConfirmation") {
                sns.confirmSubscription({ TopicArn:obj.TopicArn, Token:obj.Token}, function (err, data) {
                    console.log("confirmSubscription");
                });
            } else if (obj.Type === "Notification" && obj.Message !== undefined) {
                console.log(obj.Subject + ":" + obj.Message);
    			io.sockets.emit('msg', obj.Message);
            }
            res.end('OK');
        });
    } else if ( path === "/dist/css/timeline.css" ) {
    	res.writeHead(200, {'Content-Type':'text/css'});
        res.end(fs.readFileSync('dist/css/timeline.css'));
    } else if ( path === "/dist/css/bootstrap.min.css" ) {
    	res.writeHead(200, {'Content-Type':'text/css'});
        res.end(fs.readFileSync('dist/css/bootstrap.min.css'));
    } else if ( path === "/dist/css/bootstrap.min.css.map" ) {
    	res.writeHead(200, {'Content-Type':'text/css'});
        res.end(fs.readFileSync('dist/css/bootstrap.min.css.map'));
    } else if ( path === "/dist/css/sb-admin-2.css" ) {
    	res.writeHead(200, {'Content-Type':'text/css'});
        res.end(fs.readFileSync('dist/css/sb-admin-2.css'));
    } else if ( path === "/data/worldmap.topojson" ) {
    	res.writeHead(200, {'Content-Type':'application/json'});
        res.end(fs.readFileSync('data/worldmap.topojson'));
    } else {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(fs.readFileSync('index.html'));
    }
}
 
function initSubscriber(callback) {
    var args = {
        TopicArn:options.topic_arn,
        Protocol:"http",
        Endpoint:options.sns_endpoint
    };
 
    sns.subscribe(args, function (err, data) {
        console.log("subscribe start.");
    });
}