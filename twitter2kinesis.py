import boto3
import json

from TwitterAPI import TwitterAPI

# Twitter OAuth Tokens
consumer_key = ""
consumer_secret = ""
access_token_key = ""
access_token_secret = ""

# AWS Credentials
access_key = ""
secret_access_key = ""

# AWS Region and Kinesis Stream Name
region = ""
stream_name = ""

# Setting up Twitter and Kinesis objects
api = TwitterAPI(consumer_key, consumer_secret, access_token_key, access_token_secret)
kinesis = boto3.client('kinesis', aws_access_key_id=access_key, aws_secret_access_key=secret_access_key, region_name=region)

r = api.request('statuses/filter', {'track': 'amazon'})

# Writes new tweets into Kinesis
for item in r:
    if 'text' in item:
         kinesis.put_record(StreamName=stream_name, Data=json.dumps(item), PartitionKey=item['user']['screen_name'])
         print item['coordinates']
