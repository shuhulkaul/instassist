var Promise = require('bluebird');
var Client = require('instagram-private-api').V1;
var express = require('express');
var router = express.Router();
var session = null;
var fs = require('fs');
var everyMinutes = 10;
var intervalFunc = null;
var path = require('path');
//Accept
router.post('/accept', function(req, res)
{
var username = req.body.username;
var password= req.body.password;
var device = new Client.Device(username);
var loc = path.join("./cookie-"+username+".json");
var storage = new Client.CookieFileStorage(loc);
var pendingCount = 0;
var total=0;
function DoApprovals(){
	return Client.Relationship.pendingFollowers(session)
		.then(( pendingFollowers ) => {
			console.log('Pending Count:', pendingFollowers.length)
            pendingCount = pendingFollowers.length;
            total = total + pendingCount;
			return Promise.mapSeries( pendingFollowers, ( pending ) => {
				console.log('Approving:', pending._params.username)
				return Promise.delay(200).then( pending.approvePending.bind( pending ) )
			}).then(() => {
				if( pendingCount != 0 ){
					console.log('Approvals done, still more so continue until pending = 0')
					return DoApprovals();
                }
                if(pendingCount==0)
                {
                    accepted(req, res, total);
                }
				setTimeoutContinue();
			});
		}).catch(( err ) => {
			console.log('Do approvals error:', err)
			setTimeoutContinue()
		});
}


function setTimeoutContinue(){
	clearTimeout( intervalFunc )
	intervalFunc = setTimeout(() => {
		console.log('interval')
		DoApprovals().catch(( err ) => {
			console.log('Set timeouts error:', err)
			setTimeoutContinue()
		})
	}, 1000 * 60 * everyMinutes )
}

function error(msg){
    fs.unlinkSync(loc);
    req.flash('error_msg', msg);
    res.redirect('/error');
}

function checkpoint(req, res, url)
{
    fs.unlinkSync(loc);
    res.redirect(url);
}


function accepted(req, res, total)
{
    fs.unlinkSync(loc);
    res.render('completed', {total : total});
}

// Login and go
Client.Session.create(device, storage, username, password)
	.then(( ses ) => {
		session = ses;
		DoApprovals().catch(( err ) => {
			console.log('Create sessions error:', err)
			setTimeoutContinue();
		})
	})
	.catch(( err ) => {
        
        console.log('err:', err.message);
        if(err.url)
        {   
           checkpoint(req, res, err.url);
        }
        else{
            error(err.message);
            console.log("url is null");
        }
     
    }
    )

}
);
//SCan
router.post('/scan', function(req, res)
{
var username = req.body.username;
var password= req.body.password;
//console.log(username);
//console.log(password);
var device = new Client.Device(username);
var loc = path.join("./cookie-"+username+".json");
var storage = new Client.CookieFileStorage(loc);
Client.Session.create(device, storage, username, password)
	.then(( ses ) => {
		session = ses
		DoApprovals(username, password).catch(( err ) => {
			console.log('Create sessions error:', err.message);
			setTimeoutContinue()
		})
	})
	.catch(( err ) => {
        
        console.log('err1:', err.message);
        if(err.url)
        {   
       
           checkpoint(req, res, err.url);
        }
        else{
           
            error(err.message);
            console.log("url is null");
        }
     
    }
    );

    function error(msg){
        fs.unlinkSync(loc);
        req.flash('error_msg', msg);
		res.redirect('/error');
    }

    function checkpoint(req, res, url)
    {  fs.unlinkSync(loc);
        res.redirect(url);
    }

    function results(session, length)
    {  
       fs.unlinkSync(loc);
        res.render('results',{total:length});
        //console.log("session=", session);
        
    }

    function DoApprovals(username, password){
        var  i=0;
        return Client.Relationship.pendingFollowers( session )
            .then(( pendingFollowers ) => {
            while(typeof pendingFollowers[i] !== 'undefined')
            {
             // console.log(i);
                ++i;
            }
           
            results(session, i);
            
            })
    }

});

module.exports = router;