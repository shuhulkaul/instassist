var express = require('express');
var router = express.Router();
var url = require('url');
var dateMath = require('date-arithmetic');
var date = new Date;
var mongoose = require('mongoose');
var ig = require('instagram-node').instagram();
var request = require('request');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
            accessToken = result.access_token;
            console.log("successful login", accessToken);
            var link ='https://api.instagram.com/v1/users/self/?access_token='+accessToken;
            var importedJSON;
            request(link, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                     importedJSON = JSON.parse(body);
                    //console.log(importedJSON);
                    //console.log(importedJSON.data);
                    //console.log(importedJSON.data.username);
                    var username = importedJSON.data.username;
                    console.log(username);
                    
                    MyAppValidity.findOne({
                        'purpose' : username
                        }, function(err, user) {
                            if (user) {
                                console.log(user);
                                    if(dateMath.lte(date, user.validity) && user.acceptlimit>0)
                                    {       
                                        passport.serializeUser(function(user, done) {
                                            done(null, user);
                                          });
                                          
                                          passport.deserializeUser(function(user, done) {
                                            done(null, user);
                                          });
                                            req.login(user, function(err) {
                                            if (err) { console.log("passportjs error =",err); }
                                            return res.redirect('/dashboard/' + user.purpose);
                                          });
                                            console.log("1");
                                            //res.render("dashboard");
                                    }
                                    else{
                                        var subend = "Your subscription is upto : " + user.validity + " and your accept limit is "+ user.acceptlimit+".";
                                        console.log("12")
                                        res.render("home", {subend : subend});
                                    }
        
                            }
                            else
                            {   console.log("13");
                                var nosub = "Please subscribe first!";
                                res.render("home", {nosub : nosub});
                            }
                        });


                }
                });
         }
            
    });
})
module.exports = router;