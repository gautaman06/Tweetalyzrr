app.service('streamService', function($http) {
    let isStreamOn = false;

    this.stream = function() {
        isStreamOn = true;
        console.log('we are streaming')
        return $http.get('/stream');
    }

    this.socket = function() {
        let socket = io.connect('localhost:1337');
        socket.on('tweet', function(data) {
            console.log(data);
        });
    }
});
