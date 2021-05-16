var data = require('../db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain')
    var dat = await data.check_usr('{\"email\":\"'+req.query.email+'\", \"pass\":\"'+req.query.pass+'\"}');
    console.log(dat)
    res.send(dat);

    res.end();
});

module.exports = router;