app.service('streamService', function($http) {
    let isStreamOn = false;

    this.stream = function() {
        isStreamOn = true;
        return $http.get('/stream');
    }

    if (isStreamOn) {
        const socket = io.connect('/stream');
        return socket
    }
});
