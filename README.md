# Social Stream Monitor
It is a tool to visualize in real time the results of a search by a specific word of Twitter.

[![social-stream-monitor](https://i.ytimg.com/vi/G8KbrmuIE4o/hqdefault.jpg)](https://www.youtube.com/watch?v=G8KbrmuIE4o)

## Architecture
<img src="https://raw.githubusercontent.com/megumiteam/social-stream-monitor/master/socialstreammonitor.png" title="socialstreammonitor"/>


## Setup
- `$ git clone https://github.com/megumiteam/social-stream-monitor.git`
- Upload `social_stream_processing.template` to Cloudformation
- Access `PublicDNS` from the Outputs tab of the CloudFormation template

## Manual Execute
- Run `$ npm start` as daemon mode or run `$ node app.js`.
- `$ npm stop` or `$ npm restart`: Stop or restart daemmon.
- `$ node twitter2kinesis.js` execute Twitter Streaming to Kinesis
