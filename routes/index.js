var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res)
{
	res.render('home');
});

router.get('/error', function(req, res)
{
	res.render('home');
});
router.get('/results', function(req, res)
{
	res.render('results');
});
module.exports = router;