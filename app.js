/**
 * Module dependencies.
 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const _ = require('lodash');
const compression = require('compression');
const fs = require('fs');
const util = require('util');
fs.readFileAsync = util.promisify(fs.readFile);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const userController = require('./controllers/user');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();
app.use(express.cookieParser('your secret here'));
app.use(express.session());

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.use(expressStatusMonitor());
//app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// Define our session
app.use(session({
    resave: true,
    saveUninitialized: true,
    rolling: false,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 7200000
    },
    secret: process.env.SESSION_SECRET,
    // using store session on MongoDB using express-session + connect
    store: new MongoStore({
        url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
        autoReconnect: true,
        clear_interval: 3600
    })
}));
// Init passport authentication 
app.use(passport.initialize());
// persistent login sessions 
app.use(passport.session());
app.use(flash());

// app.use((req, res, next) => {
//   if ((req.path === '/api/upload') || (req.path === '/post/new') || (req.path === '/account/profile') || (req.path === '/account/signup_info_post')) {
//     console.log("Not checking CSRF - out path now");
//     //console.log("@@@@@request is " + req);
//     next();
//   } else {
//     // lusca.csrf()(req, res, next);
//     console.log('Removed CSRF!!!');
//   }
// });

//app.use(lusca.xframe('SAMEORIGIN'));
//allow-from https://example.com/
//add_header X-Frame-Options "allow-from https://cornell.qualtrics.com/";
//app.use(lusca.xframe('allow-from https://cornell.qualtrics.com/'));
app.use(lusca.xssProtection(true));

// app.use((req, res, next) => {
//     res.locals.user = req.user;
//     next();
// });

// app.use((req, res, next) => {
//     // After successful login, redirect back to the intended page
//     if (!req.user &&
//         req.path !== '/login' &&
//         req.path !== '/signup' &&
//         req.path !== '/bell' &&
//         !req.path.match(/^\/auth/) &&
//         !req.path.match(/\./)) {
//         console.log("@@@@@path is now");
//         console.log(req.path);
//         req.session.returnTo = req.path;
//     } else if (req.user &&
//         req.path == '/account') {
//         console.log("!!!!!!!path is now");
//         console.log(req.path);
//         req.session.returnTo = req.path;
//     }
//     next();
// });

// var csrf = lusca({ csrf: true });

// function check(req, res, next) {
//     console.log("@@@@@@@@@@@@Body is now ");
//     console.log(req.body);
//     next();
// }

// All of our static files that express will automatically serve for us.
app.use('/public', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/semantic', express.static(path.join(__dirname, 'semantic'), { maxAge: 31557600000 }));
app.use('/post_pictures', express.static(path.join(__dirname, 'post_pictures'), { maxAge: 31557600000 }));
app.use('/profile_pictures', express.static(path.join(__dirname, 'profile_pictures'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', function(req, res) {
    res.render('home', {
        title: 'Welcome'
    })
});

app.get('/profile', userController.getProfile);
app.get('/account/interest', async function(req, res) {
    const data = await fs.readFileAsync(`${__dirname}/public/jsons/interestData.json`)
    const interestData = JSON.parse(data.toString());

    res.render('interest', {
        title: 'Choose your Interest',
        interestData
    });
});

// Test Pages
app.get('/feed1', userController.getTestFeed);
app.get('/feed2', userController.getTestFeed2);
app.get('/feed3', userController.getTestFeed3);
app.get('/feed4', userController.getTestFeed4);
app.get('/feed5', userController.getTestFeed5);
app.get('/feed6', userController.getTestFeed6);

// Create a new guest account
app.get('/guest', userController.createGuest);
// Record page 
app.post('/pageLog', userController.postPageLog);
// Update profile picture and username
app.post('/profile', userController.postUpdateProfile);
// Record action in feed 
app.post('/feed', userController.postAction);

/**
 * Error Handler.
 */
// error handler
app.use(function(err, req, res, next) {
    // No routes handled the request and no system error, that means 404 issue.
    // Forward to next middleware to handle it.
    if (!err) return next();

    console.error(err);

    err.status = err.status || 500;
    err.message = "Oops! Something went wrong.";

    res.locals.message = err.message;
    res.locals.error = err;

    // render the error page
    res.status(err.status);
    res.render('error');
});

// catch 404. 404 should be considered as a default behavior, not a system error.
// Necessary to include because in express, 404 responses are not the result of an error, so the error-handler middleware will not capture them. https://expressjs.com/en/starter/faq.html 
app.use(function(req, res, next) {
    var err = new Error('Page Not Found.');
    err.status = 404;

    console.log(err);

    res.locals.message = err.message + " Oops! We can't seem to find the page you're looking for.";
    res.locals.error = err;

    // render the error page
    res.status(err.status);
    res.render('error');
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;