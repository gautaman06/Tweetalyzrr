app.component('search', {
    templateUrl: '/javascripts/components/search/search.html',
    controller: function(streamService) {
        console.log('hello from search component');
        this.searchQuery = null;

        this.save = function() {
          streamService.create(this.searchQuery)
          .then ( res => {
            console.log('this is the term you just searched', res);
            $state.go('show');
          });
        };

    }
});
