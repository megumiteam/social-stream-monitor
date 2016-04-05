# Social Stream Monitor
It is a tool to visualize in real time the results of a search by a specific word of Twitter.

[![social-stream-monitor](https://i.ytimg.com/vi/G8KbrmuIE4o/hqdefault.jpg)](https://www.youtube.com/watch?v=G8KbrmuIE4o)

## Architecture
<img src="https://raw.githubusercontent.com/megumiteam/social-stream-monitor/master/socialstreammonitor.png" title="socialstreammonitor"/>


## Setup
### Twitter Stream to Kinesis
###### Step1 Install Python modules boto3 and TwitterAPI.

    $ pip install boto3 TwitterAPI

###### step2 Edit twitter2kinesis.py

Edit The Twitter API parameters

    consumer_key = ""
    consumer_secret = ""
    access_token_key = ""
    access_token_secret = ""
    
AWS parameters - from the Outputs tab of the CloudFormation template

    access_key = ""
    secret_access_key = ""
    region = ""
    stream_name = ""
    
## socket.io server
###### Step1 Install node module

    $ npm install aws-sdk
    $ npm install url
    $ npm install async
    $ npm install socket.io
   
###### Step2 Edit app.js

Amazon SNS parameters - from the Outputs tab of the CloudFormation template

    var args = {
        TopicArn:"arn:aws:sns:...",
        Protocol:'http',
        Endpoint:"http://<socket server host>:3000/httpsns"
    };


###### Step3 Edit config/aws.json

AWS parameters - from the Outputs tab of the CloudFormation template

    {
        "accessKeyId":"",
        "secretAccessKey":"",
        "region":""
    }

## Setup Cloudformation template
- Upload `social_stream_processing.template` to Cloudformation(Please choose region `us-east-1`)
- Input `http:/<socket.io endpoint>:3000/` in socket.io server endpoint

## Execute
- `$ node app.js` execute socket.io server
- `$ python twitter2kinesis.py` execute Twitter Streaming to Kinesis
- Access to `http:/<socket.io endpoint>:3000/` on your browser.
