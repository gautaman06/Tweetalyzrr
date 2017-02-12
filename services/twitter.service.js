// Requiring some modules we'll be using
// to gather and analyze the tweets
const util = require('util');
const moment = require('moment');

// Sets up a new client to perform Twitter API interaction
const twitter = require('twitter');
// Sentiment analysis heavy lifting
const analyze = require('Sentimental').analyze;

// Here be API keys
// let keys = require('../secrets');

// Initialize a twitter client with that config
const twitterClient = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

/**
 * Get 100 tweets based on a search input
 **/
const twitterSearch = function(text, callback) {
    // Initialize a new twitter client
  //                API end point  search param
  twitterClient.get('search/tweets', { q: text, count: 100 }, function(error, tweets, response) {
  // Returns an array of objects with each tweet as an object
  // with sentiment analysis scores
  let results = tweets.statuses.map( status => {
      return {
        text: status.text,
        time: status.created_at,
        sentiment: analyze(status.text),
      }
  })
    callback(results);
  })
};

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/

// Initialize a point of storage for stream
let that = this;
that.streamData = [];
const streamAnalyze = function(text) {
    killCurrentStream();
    console.log('\n\n=== starting stream analyze for text:', text);
    // Use twitter client to start a stream of tweets, takes a callback
    twitterClient.stream('statuses/filter', { track: text }, function(stream, error) {
        // Resolve callback to start stream
        that.currentStream = stream;
        that.currentStream.on('data', function(tweet) {
            // console.log('heres a tweet', tweet.id);
            // Add sentiment analysis to each tweet object
            tweet.sentiment = analyze(tweet.text);
            //
            that.streamData.push(tweet);
            console.log(tweet.text);
        });
        stream.on('error', function(error) {
            console.log(error);
        });
    });
};

killCurrentStream = function() {
    if (that.currentStream) {
      console.log('\n\n=== killing stream... ===');
      that.currentStream.destroy();
      that.currentStream = null;
    }
}
module.exports = { twitterSearch: twitterSearch,
                   streamAnalyze: streamAnalyze,
                   streamData: that.streamData,
                   killCurrentStream: killCurrentStream
                 };
