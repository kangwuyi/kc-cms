var express = require('express')
	,path = require('path')
	,flash = require('connect-flash')
	,favicon = require('static-favicon')
	,logger = require('morgan')
	,cookieParser = require('cookie-parser')
	,bodyParser = require('body-parser')
	,partials = require('express-partials')	//模板
	,http = require('http')
	,path = require('path')
	,ejs = require('ejs')
	,session    = require('express-session')

	,settings = require('./db')	//加载
	,routes = require('./routes/index');	//加载路由

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
/// catch 404 and forward to error handler
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

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
app.routes;

module.exports = app;
