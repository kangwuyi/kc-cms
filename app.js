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
    ,RedisStore = require('connect-redis')(session)

	,settings = require('./db')	//加载
	,routes = require('./routes/index')
    ,apps = require('./routes/app');	//加载路由

/*//var redis = require("redis"),
    client = redis.createClient();
//写入JavaScript(JSON)对象
client.hmset('sessionid', { username: 'kris', password: 'password' }, function(err) {
   // console.log(err)
})

//读取JavaScript(JSON)对象
client.hgetall('sessionid', function(err, object) {
    //console.log(object)
})*/

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use( cookieParser()); //cookie解析的中间件
app.use(cookieSession({secret : 'kangcool'}));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"limit":"10000kb"}));
app.use( session({ //提供会话支持
    cookie : {
            maxAge : 60000 * 20 //20 minutes
        },
    store: new RedisStore({
        host: "127.0.0.1",
        port: 6379
        //db: "test_kcool"
    }),
    secret: 'kangcool'//这个是session加密需要的，随便写的。
}));
app.use(function(req, res, next) {
    var error = req.flash('error');
    var success = req.flash('success');
    res.locals.user = req.session.user? req.session.user:'';
    res.locals.allTag = req.session.allTag? req.session.allTag:'';
    res.locals.publicUserId = req.session.publicUserId || '';
    res.locals.publicUserKpi = req.session.publicUserKpi ? req.session.publicUserKpi:'';
    res.locals.cache = req.session.cache ? req.session.cache:'';
    res.locals.error = error.length ? error : null;
    res.locals.success = success ? success : null;//console.log('req.session.publicUserId:'+req.session.publicUserId+'+res.locals.publicUserId:'+res.locals.publicUserId)
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

var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
});
app.routes;

module.exports = app;
