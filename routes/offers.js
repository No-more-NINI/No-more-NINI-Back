var data = require('../db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    // res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Type', 'text/plain')
    var dat = data.get_offers(req.id);
    //var dat = await data.get_offers('{\"id\":1}');
    res.send(dat);
    res.end();
});

module.exports = router;