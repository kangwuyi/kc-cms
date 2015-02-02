var express = require('express')
	,path = require('path')
	,flash = require('connect-flash')
	,favicon = require('static-favicon')
	,logger = require('morgan')
	,cookieParser = require('cookie-parser')
            ,cookieSession = require('cookie-session')
	,bodyParser = require('body-parser')
	,partials = require('express-partials')	//模板
	,http = require('http')
	,path = require('path')
	,ejs = require('ejs')
	,session    = require('express-session')

	,settings = require('./db')	//加载
	,routes = require('./routes/index')
             ,apps = require('./routes/app');	//加载路由

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use( cookieParser()); //cookie解析的中间件
app.use(cookieSession({secret : 'kangcool'}));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use( session({ //提供会话支持
    secret: "kangcool",//这个是session加密需要的，随便写的。
    cookie : {
            maxAge : 60000 * 20 //20 minutes
        }
}));
app.use(function(req, res, next) {
    var error = req.flash('error');
    var success = req.flash('success');
    res.locals.user = req.session ? req.session.user:'';
    res.locals.cache = req.session ? req.session.cache:'';
    res.locals.error = error.length ? error : null;
    res.locals.success = success ? success : null;
    next();
});
app.use('/', routes);
app.use('/', apps);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    var error = req.flash('error');
    res.locals.error = error.length ? error : null;
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
