# Social Stream Monitor
## Description
Twitterの特定ワードによる検索の結果をリアルタイムに可視化するツールです

## Architecture



## Setup
### Twitter Stream to Kinesis
- Step1 Install Python modules boto3 and TwitterAPI.

    `$ pip install boto3 TwitterAPI`
    
- step2 Edit twitter2kinesis.py

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
    
### Execute

    $ python twitter2kinesis.py
    
## Socket.io server
### Step1 Install node module

   $ npm install aws-sdk
   $ npm install url
   $ npm install async
   $ npm install socket.io
   
### Step2 Edit app.js

Amazon SNS parameters

    var args = {
        TopicArn:"arn:aws:sns:...",
        Protocol:'http',
        Endpoint:"http://<socket server host>:3000/httpsns"
    };


### Step3 Edit config/aws.json

AWS parameters

    {
        "accessKeyId":"",
        "secretAccessKey":"",
        "region":""
    }

