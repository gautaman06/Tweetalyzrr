const twitterSearch = require('./twitter.service');
// const streamAnalyze = require('./twitter.service').twitterSearch;

console.log('about to search twitter...');
twitterSearch('@realdonaldtrump', function(data) {
    console.log('printing results:');
    // console.log(data.length)
    console.log(JSON.stringify(data, null, '  '));
 });

// console.log('About to stream some tweets');
// streamAnalyze('swag', function(data) {
//     console.log('here\'s a tweet');
//     console.log(JSON.stringify(data, null, '  '));
// });
