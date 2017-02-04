// Requiring some modules we'll be using 
// to gather and analyze the tweets
const util = require('util');

// Sets up a new client to perform Twitter API interaction
const twitter = require('twitter');
// Sentiment analysis heavy lifting
const analyze = require('Sentimental').analyze;

// Here be API keys
const config = require('../secrets')

module.exports = function(text, callback) {
    // Initialize a new twitter client
  const twitterClient = new twitter(config);
  //                API end point  search param
  twitterClient.get('search/tweets', {q: text}, function(error, tweets, response) {
  // Returns an array of objects with each tweet as an object 
  // with sentiment analysis scores
  let results = tweets.statuses.map( status => {
      return {
          text: status.text,
          created_at: status.created_at,
          sentiment: analyze(status.text)
      };
  })
  callback(results);
  });
}