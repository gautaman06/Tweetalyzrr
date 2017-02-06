app.component('search', {
    templateUrl: '/javascripts/components/search/search.html',
    controller: function(streamService, $state) {
        console.log('hello from search component');
        this.stream = function() {
            streamService.stream;
            $state.go('show')
        }
    }
});
