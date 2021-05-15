var data = require('../db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.put('/', async function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain')
    var dat = await data.accept_offer('{\"idoffer\":1, \"idcomp\":1, \"iduser\":1}');
    res.send(dat);
    res.end();
});

module.exports = router;