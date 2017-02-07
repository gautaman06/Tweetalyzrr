app.service('twitterService', function($http) {

    // Get 100 recent tweets with this search term
    // let searchResults = [];
    this.getSearchResults = function(searchQuery) {
      console.log(searchQuery);
      return $http.get('/search/' + searchQuery)
      .then(results => {
        console.log(results)
      });
    };

    // this.data = res.data.map(tweet => {
    //   return tweet.sentiment.score
    // });
    //
    // this.data = [];
    // this.timeStamp = [];

    //
    // let isStreamOn = false;
    //
    // this.stream = function() {
    //     isStreamOn = true;
    //     console.log('we are streaming')
    //     return $http.get('/stream');
    // }
    //
    // if (isStreamOn) {
    //     const socket = io.connect('/stream');
    //     return socket;
    // }
});
