app.component('search', {
    templateUrl: '/javascripts/components/search/search.html',
    controller: function(twitterService, $state) {
        console.log('hello from search component');

        this.searchQuery = null;

        this.search = function() {
            console.log(this.searchQuery)
            twitterService.getSearchResults(this.searchQuery);
        };
        
        this.streamQuery = null;

        this.stream = function() {
            console.log(this.streamQuery);
            twitterService.startStream(this.streamQuery);
        }
    }
});
