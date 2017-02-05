// Requiring some modules we'll be using 
// to gather and analyze the tweets
const util = require('util');
const io = require('../app').io
// Sets up a new client to perform Twitter API interaction
const twitter = require('twitter');
// Sentiment analysis heavy lifting
const analyze = require('Sentimental').analyze;

// Here be API keys
const config = require('../secrets')

// Initialize a twitter module client with the config keys
const twitterClient = new twitter(config);

// Analyze a batch of tweets
const twitterSearch = function(text, callback) {
//   //                API end point     search param
//   twitterClient.get('search/tweets',   {q: text}, function(error, tweets, response) {
//   // Returns an array of objects with each tweet as an object 
//   // with sentiment analysis scores
//   let results = tweets.statuses.map( status => {
//       return {
//           text: status.text,
//           created_at: status.created_at,
//           sentiment: analyze(status.text),
//           test: 'this is coming from twitterSearch'
//       };
//   })
//   callback(results);
//   });
}

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
// 
const streamAnalyze = function(text, callback) {
    // Initialize stream object
    let stream = twitterClient.stream('statuses/filter', {track: text})
    // Start stream
    stream.on('data', function(tweet) {



    });
    // Error handler
    stream.on('error', function(error) {
        throw error;
    });
};

streamAnalyze('falcons', console.log('======'))
module.exports.twitterSearch = twitterSearch;
module.exports.streamAnalyze = streamAnalyze;
            

