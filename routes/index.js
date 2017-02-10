const express = require('express');
const router = express.Router();

const streamAnalyze = require('../services/twitter.service').streamAnalyze;
const streamData = require('../services/twitter.service').streamData;
const killCurrentStream = require('../services/twitter.service').killCurrentStream;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/search/:searchQuery', function(req, res, next) {
  twitterSearch(req.params.searchQuery, function(data) {
    res.json(data);
  });
});

router.get('/stream/test', function(req, res, next) {
  streamAnalyze('falcons');
  res.sendStatus(200);
});

// Route hit by angular at intervals to update data
router.get('/stream/update', function(req, res, next) {
  // Slicing off a portion of data from the data stream array to send to client
  let copyOfStreamData = streamData.slice(0, streamData.length);

  // Empty the array so it can be refilled
  streamData.length = 0;

  // Send it off to client
  res.json(copyOfStreamData);
});

router.get('/stream/stop', function(req, res, next) {
  killCurrentStream();
  res.sendStatus(200);
});

// Initialize the stream running on the server
router.get('/stream/:streamQuery', function(req, res, next) {
  streamAnalyze(req.params.streamQuery);
  res.sendStatus(200);
  // res.json({text:'we searched with' + req.params.searchQuery})
});

module.exports = router;
