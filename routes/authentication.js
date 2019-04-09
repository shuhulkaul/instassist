var express = require('express');
var router = express.Router();
var url = require('url');
var dateMath = require('date-arithmetic');
var date = new Date;
var mongoose = require('mongoose');
var ig = require('instagram-node').instagram();
//models
var Transactions = require('../models/transactions');
var MyAppValidity = require('../models/myappvalidity');
//IG
ig.use({
    client_id: '627f13a5ec4646c09a47dfe266024e28',
    client_secret: 'fdb6ac694dcd40fdb8d7d9ecb775e303'
  });
var redirectUri = 'https://instassist2.herokuapp.com/authentication/handleAuth/';
  
//login
router.post('/login', function(req, res)
{
  
            res.redirect(ig.get_authorization_url(redirectUri));

});

router.get('/handleAuth', function(req, res){
    //retrieves the code that was passed along as a query to the '/handleAuth' route and uses this code to construct an access token
    ig.authorize_user(req.query.code, redirectUri, function(err, result){
        if(err){console.log("unsuccessful login");
     res.send( err );
    }
    // store this access_token in a global variable called accessToken
        accessToken = result.access_token;
    // After getting the access_token redirect to the '/' route 
        console.log("successful login", accessToken);
        res.redirect('/');
    });
})
module.exports = router;