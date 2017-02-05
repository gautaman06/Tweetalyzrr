// Requiring some modules we'll be using
// to gather and analyze the tweets
const util = require('util');

// Sets up a new client to perform Twitter API interaction
const twitter = require('twitter');
// Sentiment analysis heavy lifting
const analyze = require('Sentimental').analyze;

// Here be API keys
const config = require('../secrets')

// Initialize a twitter module client with the config keys
const twitterClient = new twitter(config);
// Analyze a batch of tweets
// const twitterSearch = function(text, callback) {
// //   //                API end point     search param
// //   twitterClient.get('search/tweets',   {q: text}, function(error, tweets, response) {
// //   // Returns an array of objects with each tweet as an object
// //   // with sentiment analysis scores
// //   let results = tweets.statuses.map( status => {
// //       return {
// //           text: status.text,
// //           created_at: status.created_at,
// //           sentiment: analyze(status.text),
// //           test: 'this is coming from twitterSearch'
// //       };
// //   })
// //   callback(results);
// //   });
// };

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
//
module.exports = function(text, callback) {
    twitterClient.stream('statuses/filter', { track: text }, function(stream) {
        stream.on('data', function(tweet) {
            // Filtering the tweet to the values we want
            // and sentiment analyzing them
            // let filteredTweet = {};
            //     filteredTweet.text = tweet.text;
            //     filteredTweet.created_at = tweet.created_at;
            //     filteredTweet.sentiment = analyze(filteredTweet.text);
            // Add a sentiment property to the tweet object
            tweet.sentiment = analyze(tweet.text);
            console.log('=======================================',tweet);
            // now send this off to io
            // ????
        });
        stream.on('error', function(error) {
            console.log(error);
        });
    });
};
