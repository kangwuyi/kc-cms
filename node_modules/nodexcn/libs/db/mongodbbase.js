var mongodb = require('mongodb');

var base = (function(){
	var mongocmd = function(){
		var server;
		var db = {};
		var serverinit = function(host,port,server_options){
			if(!server_options){
				server_options = {auto_reconnect:true,poolSize:3,socketOptions :{
					timeout :1,
					noDelay :true,
					keepAlive :1,
					encoding :'utf8'
				}};
			}
			var server = new mongodb.Server(host, port, server_options);
			return server;
		}
		var conninit = function(dbname,db_options){
			var db_connector = new mongodb.Db(dbname, server, db_options);
			return db_connector;
		}
		db.open = function(callback){
			db.open(callback);
		}
		db.newDb = function(dbname,callback,opthions){
			var db_connector = new mongodb.Db(dbname, server, db_options);
			db_connector.open(callback);
		};
		this.db = db;
		this.prepare = function(options){
			server = serverinit(options.server.host,options.server.port,options.server.options);
			db.conn = conninit(options.db.name,options.db.options);
		}
	};
	var instance = new mongocmd();
	var mongo = function(options){
		if(options){
			instance.prepare(options);
		}
		return instance;
	}
	return mongo;
})();

module.exports = base;