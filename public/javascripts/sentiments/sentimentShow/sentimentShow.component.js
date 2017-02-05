app.component('sentimentShow', {
    templateUrl: '/javascripts/sentiments/sentimentShow/sentimentShow.html',
    controller: function(sentiment) {
        console.log('hello from sentiment show component');

        // Pull in stream http get req
        this.stream = sentiment.stream;
        socket.on('tweet', function (data) {
            console.log("here is a tweet");
            console.log(data);
        });
    }
});
