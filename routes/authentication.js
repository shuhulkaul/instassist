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
    client_id: 'c5086ca1f661473ab3fb0de78f8203d7',
    client_secret: '3e3eeabc9fb74f2eae5aba477bce9a0a'
  });
var redirectUri = `https://instassist2.herokuapp.com/authentication/handleAuth`;
  
//login
router.post('/login', function(req, res)
{
            res.redirect(ig.get_authorization_url(redirectUri));
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
            console.log("res", res.req.url.code);
            accessToken = result.access_token;
            console.log("successful login", accessToken);
            // MyAppValidity.findOne({
            //     'purpose' : instaid
            //     }, function(err, user) {
            //         if (user) {}
            //     });
            var code = req.url.split('code=')[1];
            router.post(
                { form: { client_id: 'c5086ca1f661473ab3fb0de78f8203d7',
                          client_secret: '3e3eeabc9fb74f2eae5aba477bce9a0a',
                          grant_type: 'authorization_code',
                          redirect_uri: 'https://instassist2.herokuapp.com/',
                          code: code
                        },
                  url: 'https://api.instagram.com/oauth/access_token'
                },
                function (err, response, body) {
                  if (err) {
                    console.log("error in Post", err);
                  }else{
                    console.log(JSON.parse(body));
                  }
                }
              );
         }
            
    });
})
module.exports = router;