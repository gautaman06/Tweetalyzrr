app.component('search', {
    templateUrl: '/javascripts/components/search/search.html',
    controller: function(twitterService, $state) {

        this.searchQuery = null;

        this.search = function() {
            console.log(this.searchQuery)
            twitterService.getSearchResults(this.searchQuery);
        };
        
        this.streamQuery = null;

        this.stream = function() {
            console.log('starting stream on:', this.streamQuery);
            twitterService.startStream(this.streamQuery);
        }
    }
});
