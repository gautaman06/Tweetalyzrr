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

    // Initialize arrays for data
    this.tweetScores = [];
    this.tweetTimes = [];
    this.tweetText = [];
    this.filteredResponse = [];
    let timer = null;

    // Initiate stream on the server by passing it a query
    this.startStream = (streamQuery) => {
      $http.get('/stream/' + streamQuery).then( (response) => {
        $state.go('stream')
        this.getUpdate();
        // timer = $interval( () => {
        //   console.log('we are polling');
        //   this.getUpdate();
        // }, 3000);
      });
    };

    // Helper function to conduct polling
    this.getUpdate = () => {
      $http.get('/stream/update').then( (response) => {
        // Filter out tweets with sentiment score of 0
        let filteredResponse = response.data.filter( tweet => tweet.sentiment.score !== 0 );
        // Map out y-axis data
        let tweetScores = filteredResponse.map( tweet => tweet.sentiment.score );
        // Push these onto the array because we don't want it to reset each interval
        this.tweetScores.push.apply(this.tweetScores, tweetScores);

        console.log('This is just tweetScores',tweetScores);
        console.log('This is this.tweetScores',this.tweetScores);
        console.log('Scores should be growing',this.tweetScores.length);

        // Map out x-axis data
        let tweetTimes  = filteredResponse.map( tweet => tweet.time );
        this.tweetTimes.push.apply(this.tweetTimes, tweetTimes);

        let tweetText   = filteredResponse.map( tweet => tweet.text );
        this.tweetText.push.apply(this.tweetText, tweetText);

        //Pie chart data
        let positiveResults = filteredResponse.filter( tweet => tweet.tweetScores );


      });
    };

    this.stopPolling = () => {
      if (angular.isDefined(timer)) {
        $interval.cancel(timer);
        timer = undefined;
      }
    };


    this.updateStream = function() {

    }
});
