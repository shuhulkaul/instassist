var express = require('express');
var router = express.Router();
//models
var MyAppValidity = require('../models/myappvalidity');
//faqs
router.get('/faqs', function(req, res)
{
	if (req.session.user && req.cookies.user_sid) 
	{	
		res.render('faqs', { title: 'FAQs | Instassist', user : req.session.user });
    } else {
		
		res.render('faqs', { title: 'FAQs | Instassist'});
    }
	
});
//To registeration page
router.get('/subscribe', function(req, res)
{	
	if (req.session.user && req.cookies.user_sid) 
	{	
		res.render('subscribe', { title: 'Subscribe | Instassist', user : req.session.user });
    } else {	
		res.render('subscribe', { title: 'Subscribe | Instassist'});
    }
});
//report
router.get('/report', function(req, res)
{	
	if (req.session.user && req.cookies.user_sid) 
	{	
		res.render('report', { title: 'Report an Issue | Instassist', user : req.session.user });
    } else {	
		res.render('report', { title: 'Report an Issue | Instassist'});
    }
	
});
//dashboard
router.get('/dashboard', function(req, res)
{	
	if (req.session.user && req.cookies.user_sid) 
	{	
		res.render('dashboard', { title: 'Dashboard | Instassist', user : req.session.user });
    } else {
		
        res.redirect('/home');
    }
});
//contact
router.get('/contactus', function(req, res)
{	
	if (req.session.user && req.cookies.user_sid) 
	{	

		res.render('contactus', { title: 'Contact Us | Instassist', user : req.session.user});
	} 
	else {
		
        res.render('contactus', { title: 'Contact Us | Instassist'});
    }
	
});
//plans
router.get('/subscription-plans', function(req, res)
{	
	if (req.session.user && req.cookies.user_sid) 
	{	

		res.render('plans', { title: 'Plans | Instassist', user : req.session.user});
	} 
	else {
		
		res.render('plans', { title: 'Plans | Instassist'});
    }
	
});
//terms-and-conditions
router.get('/tnc', function(req, res)
{	
	if (req.session.user && req.cookies.user_sid) 
	{	

		res.render('terms-and-conditions', { title: 'Terms & Conditions | Instassist', user : req.session.user});
	} 
	else {
		
		res.render('terms-and-conditions', { title: 'Terms & Conditions | Instassist'});
    }
	
});
// Get Homepage
router.get('/', function(req, res)
{	if (req.session.user && req.cookies.user_sid) 
	{	

		res.render('dashboard', { title: 'Dashboard | Instassist', user : req.session.user});
	} 
	else {
		
		res.render('home', { title: 'Home | Instassist'});
    }
});
router.get('/home', function(req, res)
{	
	if (req.session.user && req.cookies.user_sid) 
	{	

		res.render('dashboard', { title: 'Dashboard | Instassist', user : req.session.user});
	} 
	else {
		
		res.render('home', { title: 'Home | Instassist'});
    }
});
// router.get('/results', function(req, res)
// {
// 	if (req.session.user && req.cookies.user_sid) 
// 	{	

// 		res.render('results', { title: 'Dashboard | Instassist', user : req.session.user});
// 	} 
// 	else {
		
// 		res.render('home', { title: 'Home | Instassist'});
//     }
// });
module.exports = router;