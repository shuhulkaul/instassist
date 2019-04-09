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
    //localhost
    // client_id:'627f13a5ec4646c09a47dfe266024e28' ,
    // client_secret: 'fdb6ac694dcd40fdb8d7d9ecb775e303'
    //heroku
    client_id: 'c5086ca1f661473ab3fb0de78f8203d7',
    client_secret: '3e3eeabc9fb74f2eae5aba477bce9a0a'
  });
var redirectUri = `https://instassist2.herokuapp.com/authentication/handleAuth`;
  
//login
router.post('/login', function(req, res)
{
            res.redirect(ig.get_authorization_url(redirectUri, { scope : ['basic','relationships']}));
});

router.get('/handleAuth', function(req, res){
    //retrieves the code that was passed along as a query to the '/handleAuth' route and uses this code to construct an access token
    console.log("req.query.code=",req.query.code);
    ig.authorize_user(req.query.code, redirectUri, function(err, result){
        if(err)
        {
            console.log("unsuccessful login");
            res.send( err );
         }
         else
         {
             //console.log("res1", res.req);
            //console.log("res", res.req.url.code);
            accessToken = result.access_token;
            console.log("successful login", accessToken);
           res.redirect('https://api.instagram.com/v1/users/self/?access_token='+accessToken);
            // var jsonObject = JSON.parse('https://api.instagram.com/v1/users/self/?access_token='+accessToken);
            // console.log(jsonObject);
            // MyAppValidity.findOne({
            //     'purpose' : instaid
            //     }, function(err, user) {
            //         if (user) {}
            //     });
            var code = req.url.split('code=')[1];
         }
            
    });
})
module.exports = router;