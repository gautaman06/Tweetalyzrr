app.service('twitterService', function($http, $state) {

/**
 * Get 100 recent tweets with this search term
 **/

    // Initialize a variable to set results to
    this.searchResults = [];

    this.getSearchResults = function(searchQuery) {
      console.log(searchQuery);
      return $http.get('/search/' + searchQuery)
      .then(results => {
        this.searchResults = results.data;
        $state.go('show');
      });
    };

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
    // Initialize an array to set results to 
    this.streamResults = [];

    this.streamOn = false;

    // $interval(function() {
    //   console.log('interval hitting stream');
    //   $http.get('/stream/update')
    //   .then(results => {
    //     console.log('got some data', results);
    //     this.streamResults = results.data;
    //   }) 
    // }, 100)
    // Initiate stream on the server by passing it a query
    this.startStream = (streamQuery) => {
      $http.get('/search/' + streamQuery)
    };
    
    this.getStreamData = () => {
      $http.get('/stream/update')
      .then(results => {
        console.log('got some data', results);
        this.streamResults = results.data;
      }); 
    }
    
});
