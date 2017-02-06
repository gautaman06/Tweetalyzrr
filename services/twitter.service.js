// Requiring some modules we'll be using
// to gather and analyze the tweets
const util = require('util');
const moment = require('moment');

// Sets up a new client to perform Twitter API interaction
const twitter = require('twitter');
// Sentiment analysis heavy lifting
const analyze = require('Sentimental').analyze;

// Here be API keys
const config = require('../secrets')

twitterSearch = function(text, callback) {
    // Initialize a new twitter client
  const twitterClient = new twitter(config);
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


module.exports = twitterSearch;