var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    purpose: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    acceptlimit: {
      type: Number,
      required: true
    },
    validity: {
        type: Date,
        required: true
      }
  });

  var MyAppValidity = module.exports = mongoose.model('myappvalidity', UserSchema);