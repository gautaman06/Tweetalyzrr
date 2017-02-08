const express = require('express');
const router = express.Router();

const streamAnalyze = require('../services/twitter.service').streamAnalyze;

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
let test = { greeting: 'hi Christina'};
router.get('/stream', function(req, res, next) {
    // res.json(test)
  streamAnalyze('#MuslimBan', function(data) {
    res.json(data)
  });
});

module.exports = router;
