var express = require('express');
var router = express.Router();
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
{
	res.render('dashboard', { title: 'Dashboard | Instassist'});
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
passport.serializeUser(function (user, done) {
	
	done(null, user.id);
});
passport.deserializeUser(function (id, done) {
	
		MyAppValidity.getUserById(id, function (err, user) {
		done(err, user); });
	

});

module.exports = router;