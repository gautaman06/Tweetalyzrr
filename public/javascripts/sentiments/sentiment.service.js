app.service('sentimentService', function($http) {
    this.search = function() {
        return $http.post('/search')
    }
});