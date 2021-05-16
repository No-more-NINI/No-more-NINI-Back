var data = require('../db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain')
    console.log(req.query)
    var dat = await data.near_by('{\"id\":\"'+req.query.id+'\", \"type\":\"'+req.query.type+'\"}');
    res.send(dat);
    res.end();
});

module.exports = router;