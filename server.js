var express = require('express');
var bodyParser = require('body-parser');

// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.argv[2]);

var artistes = require('./routes/artistes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Make our db accessible to our router
app.use(function(req,res,next){
     req.db = db;
     next();
});


app.use('/artistes', artistes);







/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
/// IMPORT DU WWWW

/**
 * Module dependencies.
 */

var http = require('http');

/**
 * Get port from environment and store in Express.
 */



/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(8080);

module.exports = app;