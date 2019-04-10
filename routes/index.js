var express = require('express');
var router = express.Router();
//models
var MyAppValidity = require('../models/myappvalidity');
//faqs
router.get('/faqs', function(req, res)
{
	res.render('faqs', { title: 'FAQs | Instassist'});
});
//To registeration page
router.get('/subscribe', function(req, res)
{
	res.render('subscribe', { title: 'Subscribe | Instassist'});
});
//report
router.get('/report', function(req, res)
{
	res.render('report', { title: 'Report an Issue | Instassist'});
});
//dashboard
router.get('/dashboard', function(req, res)
{	  if (req.session.user && req.cookies.user_sid) 
	{	console.log('ks');
		res.render('dashboard', { title: 'Dashboard | Instassist', user : req.session.user });
    } else {
		console("sk");
        res.redirect('/home');
    }
	
});
//contact
router.get('/contactus', function(req, res)
{
	res.render('contactus', { title: 'Contact Us | Instassist'});
});
//plans
router.get('/subscription-plans', function(req, res)
{
	res.render('plans', { title: 'Plans | Instassist'});
});
//terms-and-conditions
router.get('/tnc', function(req, res)
{
	res.render('terms-and-conditions', { title: 'Terms & Conditions | Instassist'});
});
// Get Homepage
router.get('/', function(req, res)
{
	res.render('home', { title: 'Home | Instassist'});
});
router.get('/home', function(req, res)
{
	res.render('home', { title: 'Home | Instassist'});
});
router.get('/results', function(req, res)
{
	res.render('results', { title: 'Result | Instassist'});
});


module.exports = router;