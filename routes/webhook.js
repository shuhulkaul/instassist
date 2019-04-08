var express = require('express');
var router = express.Router();
var url = require('url');
var dateMath = require('date-arithmetic');
var date = new Date;
var mongoose = require('mongoose');
//models
var Transactions = require('../models/transactions');
var MyAppValidity = require('../models/myappvalidity');

router.post('/success', function(req, res)
{
    console.log("webhook");
var data = res.req.body;
var instaid = data.purpose;
var payment_id= data.payment_id;
var payment_request_id = data.payment_request_id;
var status = data.status;
var amount = data.amount;
var fees = data.fees;
var currency = data.currency;
var buyer = data.buyer;
var buyer_name = data.buyer_name;
var buyer_phone = data.buyer_phone;
var mac = data.mac;
var plan;
var limit;
var validity;
var period;
if(amount == 9)
{
        plan =1;
        limit =10000;
        period = 20;
}
else if(amount == 450)
{
        plan =2;
        limit =35000;
        period = 30;
}
else if(amount == 800)
{
        plan =3;
        limit =65000;
        period = 30;
}
else if(amount == 1500)
{
        plan =3;
        limit =65000;
        period = 30;
}
else
{
        plan =0;
        limit =0;
        period = 0;
}
/**
 switch(amount)
{
    case "9":
        plan =1;
        limit =10000;
        period = 20;
        break;
    case "450":
        plan =2;
        limit =35000;
        period = 30;
        break;
    case "800":
        plan =3;
        limit =65000;
        period = 30;

        break;
    case "1550":
        plan =3;
        limit =65000;
        period = 30;

        break;
    default:
        plan =0;
        limit =0;
        period = 0;
        break;
}
 */

validity = dateMath.add(date, period , "day");

var newTransaction = new Transactions({
    instaid : instaid,
    buyer_name : buyer_name,
    payment_id : payment_id,
    payment_request_id : payment_request_id,
    amount : amount,
    fees : fees,
    date : date,
    buyer_phone : buyer_phone,
    currency : currency,
    status : status,
    mac : mac,
    buyer : buyer,
    validity : validity,
    limit : limit,
    plan : plan
});
newTransaction.save(function(err) {
    if (err) {
        console.log("error= ", err);
    }
    else{
        console.log('Transaction added!');
       // mongoose.connection.close();
       // mongoose.disconnect();
       
    }
    
  });
 
/**
 var newValidation = new MyAppValidity({
    purpose : purpose,
    acceptlimit : limit,
    validity : validity
});

newValidation.save(function(err) {
    if (err) throw err;
    console.log('Validity added!');
  });
 */


});
module.exports = router;