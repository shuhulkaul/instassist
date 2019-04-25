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
var templimit = req.body.limit;
var limit=0;
if(templimit==1000)
{
    limit=1000;
}
else if(templimit==5000)
{
    limit=5000;
}
else if(templimit==10000)
{
    limit=10000;
}
else if(templimit==0)
{
    limit=req.session.user.acceptlimit;
}
else{
    res.redirect('/dashboard');
}
if(limit<=req.session.user.acceptlimit)
{
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
				
                if(pendingCount==0 || pendingCount==limit || pendingCount>limit)
                {
                    accepted(req, res, total);
                }
                else
                {
					console.log('Approvals done, still more so continue until pending = 0')
					return DoApprovals();
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
	}, 100000 * 60 * everyMinutes )
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
    res.render('dashboard', {total : total});
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
else {
    res.redirect('/dashboard')
}
}
);

module.exports = router;