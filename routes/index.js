const express = require('express');
const router = express.Router();
const twitterSearch = require('../services/twitterSearch.service');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/search', function(req, res, next) {
  twitterSearch(req.body.search, function(data) {
    res.json(data)
  });
});

module.exports = router;
