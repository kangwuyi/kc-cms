var kcool = require('../../public/lib/kcool');
var Domain = require('../../models/domain');
var object = require('../../models/api/object');
var pagination = require('pagination-api');
var myDate = require('../dateFormat')();

exports.domains = function (req, res) {
	Domain.PostGetDomainsite( null,function (PostGetDomainsiteErr, PostGetDomainsite) {
		Domain.PostGetDomainsuffix( null,function (PostGetDomainsuffixErr, PostGetDomainsuffix) {
			switch (PostGetDomainsiteErr || PostGetDomainsuffixErr){
				case PostGetDomainsiteErr:
					PostGetDomainsiteErr = [];
					break;
				case PostGetDomainsuffixErr:
					PostGetDomainsuffixErr = [];
					break;
			}
			res.render('client/in/domain', { title: '十页书｜域名',PostGetDomainsite:PostGetDomainsite,PostGetDomainsuffix:PostGetDomainsuffix});
		});
	});
}

