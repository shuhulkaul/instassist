var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
     
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  module.exports = router;


