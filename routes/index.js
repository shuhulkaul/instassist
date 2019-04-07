var express = require('express');
var router = express.Router();

//To registeration page
router.get('/subscribe', function(req, res)
{
	res.render('subscribe');
});
//report
router.get('/report', function(req, res)
{
	res.render('report');
});
//contact
router.get('/contactus', function(req, res)
{
	res.render('contactus');
});
//plans
router.get('/subscription-plans', function(req, res)
{
	res.render('plans');
});
//terms-and-conditions
router.get('/tnc', function(req, res)
{
	res.render('terms-and-conditions');
});
// Get Homepage
router.get('/', function(req, res)
{
	res.render('home');
});
router.get('/home', function(req, res)
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