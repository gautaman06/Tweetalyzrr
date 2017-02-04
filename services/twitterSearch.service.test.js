const twitterSearch = require('./twitterSearch.service');

console.log('about to search twitter...');
twitterSearch('@realdonaldtrump', function(data) {
    console.log('printing results:');
    console.log(JSON.stringify(data, null, '  '));
 });
