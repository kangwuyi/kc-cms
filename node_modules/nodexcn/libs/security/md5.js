'use strict'
/**
 * New node file
 */
var crypto = require('crypto');

/**
 * md5 encode function
 * 
 * @param String data 原始字符串
 * @param bool _16mode 为true返回16位
 */
module.exports = function(data,_16mode) {
	var md5 = crypto.createHash('md5');
	md5.update(data);
	var d = md5.digest('hex');
	if(_16mode){ d = d.substr(8,16); }
	return d;
}
