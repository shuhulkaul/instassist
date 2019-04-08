var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema(
    {
      instaid:{

        type: String,
        required: true,
        
      },
      buyer_name: 
      {
        type: String,
        required: true,
        
      },
      payment_id: 
      {
        type: String,
        required: true,
        unique : true
      },
      payment_request_id: 
      {
        type: String,
        required: true,
        unique : true
      },
      amount: 
      {
        type: Number,
        required: true,
        trim:true
      },
      
      fees: 
      {
        type: Number,
        required: true,
        
      },
      date: 
      {
        type: Date,
        required: true,
        default: Date.now
        
      },
      buyer_phone:
      {
          type: Number,
          required:true
      },
      currency: 
      {
        type: String,
        required: true,
        
      },
      status: 
      {
        type: String,
        required: true,
        trim:true
      },
      mac: 
      {
        type: String,
        required: true,
        
      },
      buyer: 
      {
        type: String,
        required: true,
        trim:true
      },
      validity: 
      {
        type: Date,
        required: true
      },
      limit: 
      {
        type: Number,
        default : '' 
      },
      plan:
      {
        type: Number,
      }
    
    
    });
    
    var Transactions = module.exports = mongoose.model('transactions', UserSchema);
    