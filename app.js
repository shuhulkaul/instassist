var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var morgan = require('morgan');
// Init App
var app = express();
//Database connectivity
mongoose.connect('mongodb+srv://instassistofficial:Inst@ssIst22@instassistdb-0no3p.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;
app.use(morgan('dev'));
// Express Session
app.use(session({
  key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});
var sessionChecker;
module.exports.sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/dashboard');
  } else {
      next();
  }    
};

//routes
var routes = require('./routes/index');
var login = require('./routes/login');
var payment = require('./routes/payment');
var contact = require('./routes/contact');
var webhook = require('./routes/webhook');
var authentication = require('./routes/authentication');
// View Engine
//Default view directory
app.set('views', path.join(__dirname, 'views'));
//default layout
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, '/public')));


// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', routes);
app.use('/login', login);
app.use('/payment', payment);
app.use('/contact', contact);
app.use('/webhook', webhook);
app.use('/authentication', authentication);
// Set Port
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Server started on port '+ port);
});

app.use(function (req, res) {
  res.status(404).render('404', { title: '404'});
});