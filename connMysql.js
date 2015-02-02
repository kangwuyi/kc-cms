(function() {
	var connMysql;

	connMysql = {
		db: {
		            host: 'localhost',     //本地数据库
		            port: '3306',	//数据库端口
		            user: 'root',          //数据库用户名
		            password: '',          //数据库密码
		            database: 'kcool'  //数据库名称
        		}
	};

	module.exports = connMysql;

}).call(this);