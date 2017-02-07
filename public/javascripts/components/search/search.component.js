app.component('search', {
    templateUrl: '/javascripts/components/search/search.html',
    controller: function(twitterService) {
        console.log('hello from search component');

        this.searchQuery = null;

        this.search = function() {
          twitterService.getSearchResults(this.searchQuery);
        };
    }
});