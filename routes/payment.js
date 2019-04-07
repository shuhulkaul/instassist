var express = require('express');
var router = express.Router();
const Insta = require('instamojo-nodejs');
const url = require('url');
router.post('/webhook', function(req, res)
{

console.log(res.purpose);
});
router.post('/', function(req, res)
{
var name = req.body.name;
var iname = req.body.iname;
var reiname = req.body.reiname;
var mobile = req.body.mobile;
var email = req.body.email;
var plan = req.body.plan;
console.log("plan=", plan);
var amount;
switch(plan)
{
    case "1" :
    amount = 9.00;
    break;
    case "2":
    amount = 450.00;
    break;
    case "3" :
    amount = 800.00;
    break;
    case "4":
    amount = 1500.00;
    break;
    default:
    amount = 0.00;
    break;
}
//Validation
req.checkBody('name', 'Name is required!').notEmpty();
req.checkBody('iname', 'Instagram username is required!').notEmpty();
req.checkBody('iname', 'Instagram username does not match!').equals(reiname);
req.checkBody('mobile', 'Mobile number is required!').notEmpty();	
req.checkBody('mobile', 'Mobile number is not valid!').isInt({min: 6000000000, max:9999999999});
req.checkBody('email', 'Email is required!').notEmpty();
req.checkBody('email', 'Email is not valid!').isEmail();
req.checkBody('plan', 'The plan is not valid!').isInt({min: 1, max:4});

var errors = req.validationErrors();
if (errors) {
		console.log(errors);
    res.render('subscribe', {
        errors: errors
    });
}
else {
   
    console.log("amount=", amount);
	  Insta.setKeys('test_13aa1f1327d28dd1c9bcc0779a6', 'test_f4bfe00d422e44fb0e70591191e');
	//Insta.setKeys('a1c9a8485963bd845454a3b78b4d0d7e', '11f209e10f2790dd3b2050b90b0f53c9');

		const data = new Insta.PaymentData();
		Insta.isSandboxMode(true);

	data.purpose = iname;
	data.amount = amount;
	data.buyer_name =  name;
	data.redirect_url = `http://${req.get('host')}/payment/callback`;
	data.email =  email;
	data.phone =  mobile;
	data.currency='INR';
	data.send_email =  false;
	data.webhook= `http://instassist2.herokuapp.com/payment/webhook`;
	data.send_sms= false;
	data.allow_repeated_payments =  false;
	

	Insta.createPayment(data, function(error, response) {
		if (error) {
		  // some error
		} else {
		  // Payment redirection link at response.payment_request.longurl
		  const responseData = JSON.parse( response );
		  console.log(responseData.payment_request.longurl);
		  res.redirect(responseData.payment_request.longurl);
		}
	  });
}

});

router.get( '/callback', ( req, res ) => {
	//console.log("req=", req);
	//console.log("res=", res);
//	console.log("req-query", req.query);
//	console.log("name", req.user.name);
	let url_parts = url.parse( req.url, true),
		responseData = url_parts.query;
		console.log(responseData);
	if ( responseData.payment_id ) {
		let userId = responseData.user_id;
	//	console.log("user",user_id);
		// Save the info that user has purchased the bid.
		const bidData = {};
		bidData.package = 'Bid100';
		bidData.bidCountInPack = '10';
			console.log("callback");
			//console.log(iname);
		// Redirect the user to payment complete page.
		return res.render('subscribe' );
	}

} );

module.exports = router;