app.component('show', {
    templateUrl: '/javascripts/components/show/show.html',
    controller: function(streamService) {
        console.log('hello from sentiment show component');

        // Pull in stream http get req
        // socket.on('tweet', function (data) {
        //     console.log("here is a tweet");
        //     console.log(data);
        // });
        this.socket = streamService.socket();
    }
});
