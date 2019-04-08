var express = require('express');
var router = express.Router();
const url = require('url');
router.post('/webhook', function(req, res)
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
var date;
var plan;
var limit;



});
module.exports = router;