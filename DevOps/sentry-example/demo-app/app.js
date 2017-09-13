var app = require('express')();
var Raven = require('raven');

// Must configure Raven before doing anything else with it
Raven.config('http://d89fcfc644834cf4a73d004f07eef2b8:d845222b884b4aadb08cbc56ba036c3a@localhost:9000/2').install();

// The request handler must be the first middleware on the app
app.use(Raven.requestHandler());

app.get('/', function mainHandler(req, res) {
    throw new Error('Broke!');
});

// The error handler must be before any other error middleware
app.use(Raven.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + '\n');
});

app.listen(3000);
