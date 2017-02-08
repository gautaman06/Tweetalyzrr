// Requiring some modules we'll be using
// to gather and analyze the tweets
const util = require('util');
const moment = require('moment');

// Sets up a new client to perform Twitter API interaction
const twitter = require('twitter');
// Sentiment analysis heavy lifting
const analyze = require('Sentimental').analyze;

// Here be API keys
const config = require('../secrets');

// Initialize a twitter client with that config
const twitterClient = new twitter(config);

/**
 * Get 100 tweets based on a search input
 **/
twitterSearch = function(text, callback) {
    // Initialize a new twitter client
  //                API end point  search param
  twitterClient.get('search/tweets', { q: text, count: 100 }, function(error, tweets, response) {
  // Returns an array of objects with each tweet as an object
  // with sentiment analysis scores
  let results = tweets.statuses.map( status => {
      return {
        text: status.text,
        time: status.created_at,
        // creationMoment: moment(Date(status.created_at)).format('LLL'),
        // location: status.location, this doesnt work for some reason
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
let streamData = [];

streamAnalyze = function(text, callback) {
    // Use twitter client to start a stream of tweets, takes a callback
    twitterClient.stream('statuses/filter', { track: text }, function(stream) {
        // Resolve callback to start stream
        stream.on('data', function(tweet) {

            // Add sentiment analysis to each tweet object
            tweet.sentiment = analyze(tweet.text);
            // Push tweets into storage array
            callback(tweet);
        });
        stream.on('error', function(error) {
            console.log(error);
        });
    });
};


slicedData = streamData.slice
module.exports = { twitterSearch: twitterSearch, streamAnalyze: streamAnalyze };
