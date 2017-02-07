app.service('streamService', function($http) {
    // Get 15 tweets with a search term
    this.getSearchResults = function() {
        return $http.get('/search');
    };

    this.create = function(searchQuery) {
      return $http.post('/search', searchQuery);
    };
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
