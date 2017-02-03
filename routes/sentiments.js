'use strict'

var express = require('express');
var router = express.Router();

//require our model here

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

module.exports = router;
