app.service('twitterService', function($http, $state, $interval) {

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



    this.tweetScores = [];
    this.tweetTimes = [];
    this.tweetText = [];
    
    let timer = null;

    // Initiate stream on the server by passing it a query
    this.startStream = (streamQuery) => {
      $http.get('/stream/' + streamQuery).then( (response) => {
        this.getUpdate();
        timer = $interval( () => {
          console.log('we are polling');
          this.getUpdate();
        }, 5000);
      });
    };

    this.getUpdate = () => {
      $http.get('/stream/update').then( (response) => {
        let tweets = response.data.map( tweet => tweet.text );
        this
        console.log('polling got data:', tweets);
      });
    };

    this.stopPolling = () => {
      if (angular.isDefined(timer)) {
        $interval.cancel(timer);
        timer = undefined;
      }
    };
    
    this.getStreamData = () => {
      $http.get('/stream/update')
      .then(results => {
        console.log('got some data', results);
        this.streamResults = results.data;
      }); 
    }

    this.updateStream = function() {
      
    }
});

