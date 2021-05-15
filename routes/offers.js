var data = require('../db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var dat = data.get_offers('{\"id\":1}');
    res.render('index', dat);
});

module.exports = router;