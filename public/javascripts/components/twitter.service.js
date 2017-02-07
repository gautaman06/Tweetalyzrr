app.service('twitterService', function($http, $state) {

// ==== Get 100 recent tweets with this search term ==== \\
    // Initialize a variable to set results to
    this.searchResults = [];

    this.getSearchResults = function(searchQuery) {
      console.log(searchQuery);
      return $http.get('/search/' + searchQuery)
      .then(results => {
        this.searchResults = results.data;
        $state.go('show');
        // console.log('these are the results in the service', results)
      });
    };



    // console.log('these are the results in the service, bound to stuff', searchResults)
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
