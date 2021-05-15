var data = require('../db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain')
    var dat = await data.location('{\"id\":\"'+req.query.id+'\", \"latitude\":\"'+req.query.latitude+'\", \"longitude\":\"'+req.query.longitude+'\"}');
    // res.send(dat);
    res.end();
});

module.exports = router;