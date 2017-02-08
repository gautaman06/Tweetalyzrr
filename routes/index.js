const express = require('express');
const router = express.Router();

const streamAnalyze = require('../services/twitter.service').streamAnalyze;
const streamData = require('../services/twitter.service').streamData;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/search/:searchQuery', function(req, res, next) {
  twitterSearch(req.params.searchQuery, function(data) {
    res.json(data);
  });
});

// router.get('/stream', function(req, res, next) {
//   console.log(req);
//   console.log('stream got hit');
//   streamAnalyze('#MuslimBan');
//   res.status(200).send
// });
router.get('/stream/start', function(req, res, next) {
  console.log('started stream')
  streamAnalyze('Falcons');
  res.sendStatus(200);
});

router.get('/stream/update', function(req, res, next) {
  let slicedData = streamData.slice(0, streamData.length);
  res.json(slicedData);
  slicedData.length = 0;
});



router.get('/stream/stop', function(req, res, next) {

});


module.exports = router;
