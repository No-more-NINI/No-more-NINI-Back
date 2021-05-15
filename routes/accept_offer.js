var data = require('../db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var dat = data.accept_offer('{\"idoffer\":1, \"idcomp\":1, \"iduser\":1}');
    res.send(dat);
});

module.exports = router;