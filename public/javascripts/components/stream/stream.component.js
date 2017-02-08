app.component('stream', {
    templateUrl: '/javascripts/components/stream/stream.html',
    controller: function(twitterService) {
        console.log('HELLO FROM THE OUT SIIIIIIIIIIIIIIIDE');

        this.streamResults = twitterService.streamResults;
        console.log('these are the stream results:', this.streamResults);
    }
});
