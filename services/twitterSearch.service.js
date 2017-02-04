// Requiring some modules we'll be using 
// to gather and analyze the tweets
const util = require('util');
const twitter = require('twitter');
const sentimentAnalysis = require('./sentimentAnalysis.service');
const config = require('../secrets')
//     db = require('diskdb');

// db = db.connect('db', ['sentiments']);
console.log(config);

module.exports = function(text, callback) {
  var twitterClient = new twitter(config);
  var response = [];
//   , dbData = []; // to store the tweets and sentiment

  twitterClient.search(text, function(data) {
    for (var i = 0; i < data.statuses.length; i++) {
      var resp = {};

      resp.tweet = data.statuses[i];
      resp.sentiment = sentimentAnalysis(data.statuses[i].text);
      dbData.push({
        tweet: resp.tweet.text,
        score: resp.sentiment.score
      });
      response.push(resp);
    };
    db.sentiments.save(dbData);
    callback(response);
  });
}