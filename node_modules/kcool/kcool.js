;(function() {
	window['kcool'] = {};	//把kcool这个命名空间注册到了window上,进行库封装，防止对象污染
	// 保证AMD分模块可用
	if (typeof define !== 'undefined'){
		define([], function () {
			return kcool;
		});
	}
  	else if (typeof window !== 'undefined'){
  		// 保证客户端可用
  		if (!window.kcool) {
			window.kcool = kcool;
		}
	}else{
    		// 保证后台可用
    		module.exports = kcool;
  	}
	//对象用于获得当前页面的地址(URL),并把浏览器重定向到新的页面
  	var location = window.location,
	//body是DOM对象里的body子节点，即 <body> 标签；documentElement 是整个节点树的根节点root，即<html> 标签；
	decu= document.documentElement || document.body,
	docReady = document.ready,
	//Navigator 是HTML DOM中的内置对象，它包含有关浏览器的信息。userAgent是Navigator 的属性方法，可返回由客户机发送服务器的 user-agent 头部的值。作用其实就是返回当前用户所使用的是什么浏览器，toLowerCase() 是将获得的信息变成小写
	userAgent = navigator.userAgent.toLowerCase(),
	ua = window.navigator.userAgent.toLowerCase(),
	quirks = document.compatMode === "BackCompat",
	version = (ua.match(/.(?:rv|it|ra|ie)[\/:]([\d.]+)/) || [])[1],
	isOpera = /opera/.test(userAgent),
	isChrome = /chrome/.test(userAgent),
	isWebKit = /webkit/.test(userAgent),
	isIe6 = /msie6.0/.test(userAgent),
	isIe = /msie/.test(userAgent) && !isOpera,
	isSafari = /webkit/.test(userAgent),
	//isSafari = !isChrome && isWebKit,
	isFirefox = /firefox/.test(userAgent);
	//用于提示信息
	var prompt = {
		require: '缺少参数，参数必须的',
		rule: '参数不合法'
	};
	kcool = {
		//工具
		tools: {
			//测试
			G: function () {
				alert("测试");
			},
			//打印全局变量
			global_variable: function () {
				for (var w in window) {
			    		document.write(window[w]+'<br>');
				}
			},
			//删除左右两端的空格
			trim: function  (str){
				return str.replace(/(^\s*)|(\s*$)/g, "");
				//return str.replace(/^\s*(.*?)\s*$/, '$1');
			},
			//删除左边的空格
		 	ltrim: function  (str){
				return str.replace(/(^\s*)/g,"");
			},
			//删除右边的空格
			rtrim: function  (str){
				return str.replace(/(\s*$)/g,"");
			},
			//获得上上级文件目录(还有错误！！！)
			route_3: function  (str){
				return str=str.replace(/\/[^\/]+\/[^\/]+$/,"/");
			},
			//日期字符串格转日期
			parseDate: function (date) {
				var dt = dateinstanceofDate ? date: Date(date.replace("-", "/"));
				return isNaN(dt.getTime()) ? null: dt;
			},
			//Json字符串转对象
			parseJSON: function (jsonString) {
				var result = false;
				try {
					result = eval('(' + jsonString + ')');
				} catch(e) {};
				return result;
			},
			//取不重复唯一值
			getUid: function () {
				return  "uid" + (newDate()).getTime() + parseInt(Math.random() * 100000);
			},
			//获取指定范围的随机数
			random: function (n1, n2) {
				return Math.floor(Math.random() * (n2 - n1 + 1)) + n1;
			},
			//秒转换为毫秒
			s2ms: function (str) {
				var t = str.split(":");
				return t[0] * 60000 + t[1] * 1000;
			},
			//毫秒转换为秒
			ms2s: function (ms) {
				return  (ms / 60000 + ":" + ms / 1000 % 60).replace(/\.\d+/g, "").replace(/(^|:)(\d)(?!\d)/g, "$10$2");
			},
			//数字转换为编号
			num2number: function (num, n) {
				return Array(n).join("0").concat(num).slice( - n);
			},
			//数字转化为中文
			num2gb: function (n) {
				return  "零一二三四五六七八九".split("")[n];
			},
			//获取鼠标位置
			getXY: function (ev) {
				return  {
					x: ev.pageX ? ev.pageX: ev.clientX + decu.scrollLeft,
					y: ev.pageY ? ev.pageY: ev.clientY + decu.scrollTop
				};
			},
			//绑定拖动事件
			drag: function (obj, obj2) { //obj：移动的对象obj2：拖动点
				obj2 = obj2 || obj; //如果不设拖动点，那么拖动点即移动的对象
				var x,
				y,
				ut = this;
				obj2.onmousedown = function (e) {
					e = e || win.event;
					ut.preventDefault(e);
					obj.setCapture && obj.setCapture();
					x = ut.getXY(e).x - parseInt(obj.style.left);
					y = ut.getXY(e).y - parseInt(obj.style.top);
					decu.onmousemove = over;
					decu.onmouseup = up;
				}
				function over(e) {
					e = e || win.event;
					obj.style.left = ut.getXY(e).x - x + "px";
					obj.style.top = ut.getXY(e).y - y + "px";
				}
				function up() {
					obj.releaseCapture && obj.releaseCapture();
					decu.onmousemove = null;
					decu.onmouseup = null;
				}
			},
			//绑定横向滚动事件
			sliderX: function (obj, x1, x2, overEvent, upEvent) {
				var x,
				t,
				ut = this;
				obj.onmousedown = function (e) {
					e = e || win.event;
					ut.preventDefault(e);
					obj.setCapture && obj.setCapture();
					t = ut.getXY(e).x - parseInt(obj.style.left);
					decu.onmousemove = over;
					decu.onmouseup = up;
				}
				function over(e) {
					e = e || win.event;
					x = ut.getXY(e).x - t;
					if (x < x1) x = x1;
					if (x > x2) x = x2;
					obj.style.left = x + "px";
					overEvent && overEvent(x);
				}
				function up() {
					obj.releaseCapture && obj.releaseCapture();
					decu.onmousemove = null;
					decu.onmouseup = null;
					upEvent && upEvent(x);
				}
			},
			//绑定竖向滚动事件
			sliderY: function (obj, y1, y2, overEvent, upEvent) {
				var y,
				t,
				ut = this;
				obj.onmousedown = function (e) {
					e = e || win.event;
					ut.preventDefault(e);
					obj.setCapture && obj.setCapture();
					t = ut.getXY(e).y - parseInt(obj.style.top);
					decu.onmousemove = over;
					decu.onmouseup = up;
				}
				function over(e) {
					e = e || win.event;
					y = ut.getXY(e).y - t;
					if (y < y1) y = y1;
					if (y > y2) y = y2;
					obj.style.top = y + "px";
					overEvent && overEvent(y);
				}
				function up() {
					obj.releaseCapture && obj.releaseCapture();
					decu.onmousemove = null;
					decu.onmouseup = null;
					upEvent && upEvent(y);
				}
			},
			//遍历
			each: function (obj, func, context) {
				var length = obj.length,
				i = -1;
				if (length !== undefined) {
					while (++i < length) if (func.call(context, obj[i], i, obj, length) === false) break;
				}
				else for(var key in obj) if (obj.hasOwnProperty(key)) if (func.call(context, key, obj[key], obj) === false) break;
				return obj;
			},
			//播放器生成代码
			getPlayer: function (url, width, height, param) {
				var wmp = ["6bf52a52-394a-11d3-b153-00c04f79faa6", "application/x-mplayer2"];
				var rmp = ["CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA", "audio/x-pn-realaudio-plugin"];
				var mp = /\.rm$/.test(url) ? rmp: wmp;
				var tagName = "",
				o1 = {
					width: width || 1,
					height: height || 1
				},
				o2 = {};
				if (this.isIE) {
					tagName = "object";
					o1.classid = "clsid:" + mp[0];
					o2.url = url;
					param && this.extend(o2, param);
				} else {
					tagName = "embed";
					o1.type = mp[1];
					o1.src = url;
					param && this.extend(o1, param);
				}
				if (o1.width < 2 && o1.height < 2) tagName += 'style="position:absolute;top:-100px;"';
				var a1 = [],
				a2 = [],
				i;
				for (i in o1) a1.push(i + '="' + o1[i] + '"');
				for (i in o2) a2.push('<paramname="' + i + '"value="' + o2[i] + '"/>');
				return  '<' + tagName + a1.join('') + '>' + a2.join('') + '</' + tagName + '>';
			},
			//Flash生成代码
			getFlash: function (url, width, height, param) {
				var tagName = "",
				o1 = {
					width: width || 1,
					height: height || 1
				},
				o2 = {};
				if (this.isIE) {
					tagName = "object";
					o1.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
					o1.codebase = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0";
					o2.movie = url;
					o2.quality = "high";
					param && this.extend(o2, param);
				} else {
					tagName = "embed";
					o1.type = "application/x-shockwave-flash";
					o1.pluginspage = "http://www.adobe.com/go/getflashplayer_cn";
					o1.src = url;
					o1.quality = "high";
					param && this.extend(o1, param);
				}
				if (o1.width < 2 && o1.height < 2) tagName += 'style="position:absolute;top:-100px;"';
				var a1 = [],
				a2 = [],
				i;
				for (i in o1) a1.push(i + '="' + o1[i] + '"');
				for (i in o2) a2.push('<paramname="' + i + '"value="' + o2[i] + '"/>');
				return  '<' + tagName + a1.join('') + '>' + a2.join('') + '</' + tagName + '>';
			},
			//Dom加载
			docReady: function (func) {
				var isReady = false,
				doReady = function () {
					if (isReady) return ;
					isReady = true;
					func();
				};
				if (isIE) {
					if (decu.doScroll && win.self == win.top) { (function () {
							if (isReady) return ;
							try {
								decu.doScroll("left");
							} catch(error) {
								setTimeout(arguments.callee, 0);
								return ;
							}
							doReady();
						})();
					} else {
						if (isReady) return ;
						this.attachEvent("onreadystatechange",
						function () {
							if (doc.readyState === "complete") {
								doc.detachEvent("onreadystatechange", arguments.callee);
								doReady();
							}
						});
					}
					win.attachEvent('onload', doReady);
				}
				else if(isWebKit && version < 525) { (function () {
						if (isReady) return ;
						if (/loaded|complete/.test(doc.readyState)) doReady();
						else setTimeout(arguments.callee, 0);
					})();
					win.addEventListener('load', doReady, false);
				} else {
					if (!isFF) this.addEventListener("DOMContentLoaded",
					function () {
						doc.removeEventListener("DOMContentLoaded", arguments.callee, false);
						doReady();
					},
					false);
					this.addEventListener('load', doReady, false);
				}
			},
		},
		//对象继承或属性合并，第一个参数是目标对象，第二个参数是原对象 ，对原对象中的每个属性进行判断，如果是，那么将他拷贝到目标的对象上去
		extend: function(targetObject,originalObject){
			this.each(originalObject,
				function (key, value) {
					targetObject[key] = value;
			});
			return targetObject;
			/*for (var property in originalObject) {
			    targetObject[property] = originalObject[property];   // 利用动态语言的特性, 通过赋值动态添加属性与方法
			}
			return targetObject;   // 返回扩展后的对象*/
		},
		extend: {
			// 一个静态方法, 传入一个对象, 返回对象的字符串表示
			inspect: function(originalObject) {
				try {
					// 处理undefined情况
					if (originalObject == undefined) {
						return 'undefined';
					}
					// 处理null情况
					if (originalObject == null) {
						return 'null';
					}
					// 如果对象定义了inspect方法, 则调用该方法返回, 否则返回对象的toString()值
					return originalObject.inspect ? originalObject.inspect() : originalObject.toString();
				} catch(e) {
					// 处理异常情况
					if (e instanceof RangeError) {
						return '...';
					}
					throw e;
				}
			},
			// 一个静态方法, 传入一个对象, 返回该对象中所有的属性, 构成数组返回
			keys: function(originalObject) {
				var keys = [];
				for (var property in originalObject) {
					keys.push(property); // 将每个属性压入到一个数组中
				}
				return keys;
			},
			// 一个静态方法, 传入一个对象, 返回该对象中所有属性所对应的值, 构成数组返回
			values: function(originalObject) {
				var values = [];
				// 将每个属性的值压入到一个数组中
				for (var property in originalObject){
					values.push(originalObject[property]);
				}
				return values;
			},
			// 一个静态方法, 传入一个对象, 克隆一个新对象并返回
			clone: function(originalObject) {
				return originalObject.extend({},originalObject);
			}
		},
		//组件
		assembly:{
			//设置透明度setOpacity，node 类名 level 透明度
			setOpacity: function (node,level){
           				node = typeof node=="string" ? document.getElementById(node) : node;
            				if(document.all){ //document.all 是IE支持属性 firefox 不支持
                					node.style.filter = 'alpha(opacity=' + level+ ')';
            				}else{
                					node.style.opacity= level/100;
         				}
        				},
        				//隐藏或显示元素
			hide: function (elem) {
				elem.style.display = "none";
			},
			show: function (elem) {
				elem.style.display = "block";
			},
			toggle: function (elem) {
				elem.style.display = this.getStyle(elem, "display") === "none" ? "block": "none";
			},
			//图像预加载
			loadimages: function () {
				var a = arguments,
				loads = function () {
					if (doc.images) {
						if (!doc.ps) doc.ps = [];
						var i,
						j = doc.ps.length;
						for (i = 0; i < a.length; i++) if (a[i].indexOf("#") != 0) {
							doc.ps[j] = newImage;
							doc.ps[j++].src = a[i];
						}
					}
				};
				arguments.callee.caller ? loads() : docReady(loads);
			},
		},
		//判断
		judge: {
			//类型检测
			//是否为数组
			isArray: function (v) {
				return Object.prototype.toString.apply(v) === "[objectArray]";
			},
			//是否为函数体
			isfunction : function (v) {
				return Object.prototype.toString.apply(v) === "[objectfunction ]";
			},
			//是否为数字
			isNumber: function (v) {
				return  typeof v === "number" && isFinite(v);
			},
			//是否为日期
			isDate: function (v) {
				return Object.prototype.toString.apply(v) === "[objectDate]";
			},
			//是否为Dom元素节点
			isElement: function (v) {
				return  !! (v && v.nodeType === 1);
			},
		},
		//获得值
		acquire: {
			//取id元素
			getId: function (id) {
				return  typeof id === "string" ? doc.getElementById(id) : id;
			},
			//取name元素集合
			getName: function (name) {
				return doc.getElementsByName(name);
			},
			//取tag元素集合
			getTag: function (tag, root) {
				return  (root || doc).getElementsByTagName(tag);
			},
			//按属性名(是否包含)、值、范围取元素集合
			getAll: function (attrName, attrValue, tag, root) {
				var elems = doc.all ? doc.all: this.getTag(tag || "*", root || doc),
				result = [],
				attVal = ( typeof attrValue != "undefined") ? newRegExp("(^|\\s)" + attrValue + "(\\s|$)") : null;
				for (var i = 0; i < elems.length; i++) {
					attr = elems[i][attrName] || elems[i].getAttribute(attrName);
					if ( typeof attr === "string" && attr.length > 0) {
						if ( typeof attrValue === "undefined" || (attVal && attVal.test(attr))) {
							result.push(elems[i]);
						}
					}
				}
				return result;
			},
			//取body元素
			getBody: document.body || decu,
			//取Class属性元素集合
			getClass: function (attrValue, tag, root) {
				return this.getAll("className", attrValue, tag, root);
			},
			//取浏览器窗体宽度
			getWinWidth: window.innerWidth || decu.clientWidth || document.body.clientWidth,
			//取浏览器窗体高度
			getWinHeight: window.innerHeight || decu.clientHeight || document.body.clientHeight,
			//取元素样式
			getStyle: function (elem, name) {
				if (elem.style[name]) {
					return elem.style[name];
				}
				else if(elem.currentStyle) {
					return elem.currentStyle[name];
				}
				else if(document.defaultView && document.defaultView.getComputedStyle) {
					name = name.replace(/([A-Z])/g, "-$1");
					name = name.toLowerCase();
					var s = document.defaultView.getComputedStyle(elem, "");
					return s && s.getPropertyValue(name);
				} else {
					return null;
				}
			},
			//获取元素屏幕坐标值
			getPosition: function () {
				return decu.getBoundingClientRect &&
				function (o) {
					var pos = o.getBoundingClientRect(),
					root = o.ownerDocument || o.document;
					return  {
						left: pos.left + root.documentElement.scrollLeft,
						top: pos.top + root.documentElement.scrollTop
					};
				} ||
				function (o) {
					var x = 0,
					y = 0;
					do {
						x += o.offsetLeft;
						y += o.offsetTop;
					} while (( o = o . offsetParent ));
					return  {
						left: x,
						top: y
					};
				};
			},
			//获取XMLHttp对象
			xmlhttp: function () {
				if (this.isFF) return newXMLHttpRequest();
				var a = ["Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0", "Msxml2.XMLHTTP.5.0"];
				for (var i = 0, l = a.length; i < l; i++) {
					try {
						return newActiveXObject(a[i]);
					} catch(e) {}
				}
				return false;
			},
			//Get数据
			get: function (url, callBack) {
				var x = this.xmlhttp();
				x.open("get", url, true);
				x.onreadystatechange = function () {
					x.readyState == 4 && (x.status == 0 || x.status == 200) && callBack(x.responseText);
				}
				x.send(null);
			},
			//Post数据
			post: function (url, arg, callBack) {
				var x = this.xmlhttp();
				x.open("post", url, true);
				x.setRequestHeader("Content-Length", arg.length);
				x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				x.onreadystatechange = function () {
					x.readyState == 4 && (x.status == 0 || x.status == 200) && callBack(x.responseText);
				}
				x.send(arg);
			},
		},
		//浏览器
		browser: {
			//浏览器检测
			isOpera: isOpera,
			isChrome: isChrome,
			isWebKit: isWebKit,
			isSafari: isSafari,
			isIe: isIe,
			isIe6: isIe6,
			isFirefox: isFirefox,
			isQuirks: quirks,
			getVersion: version,
		},
		//Dom操作
		dom: {
			$: function (id) {
				return  typeof  id === 'string' ? d.getElementById(id) : id;
			},
			remove: function (o) {
				var obj = this.$(o);
				if (!obj) {
					return ;
				}
				return obj.parentNode.removeChild(obj);
			},
			setOpacity: function (obj, val) {
				var vals = (typeof obj === "number" && val <= 100 && val >= 0) ? val: 100;
				if (!obj) {
					return ;
				}
				if (ie) {
					obj.style.filter = 'alpha(opacity=' + vals + ')';
				} else {
					obj.style.opacity = vals / 100;
				}
			},
			getMaxZindex: function (o) {
				var maxZindex = 0;
				var obj = o ? o: '*';
				var divs = d.getElementsByTagName(obj);
				for (z = 0; z < divs.length; z++) {
					maxZindex = Math.max(maxZindex, divs[z].style.zIndex);
				}
				return maxZindex;
			},
			createElement: function (type, prop) {
				var tmp = d.createElement(type);
				for (var i in prop) {
					tmp.setAttribute(i, prop[i]);
				}
				return tmp;
			},
			createTextNode: function (txt) {
				return d.createTextNode(txt);
			},
			hasAttr: function (obj, attr) {
				obj.getAttribute(attr);
				return obj;
			},
			setAttr: function (obj, attr) {
				var self = this;
				for (var i in attr) {
					if (i === 'class') {
						self.addClass(obj, attr[i]);
					} else {
						obj.setAttribute(i, attr[i]);
					}
				}
				return obj;
			},
			removeAttr: function (obj, attr) {
				obj.removeAttribute(attr);
				return obj;
			},
			getClass: function (c, pd) {
				var all = pd ? d.getElementsByName(pd).getElementsByTagName("*") : d.getElementsByTagName("*"),
				str = "",
				n = [];
				for (var i = 0; i < all.length; i++) {
					if (KW.Dom.hasClass(all[i], c)) {
						n.push(all[i]);
					}
				}
				return n;
			},
			addClass: function (o, str) {
				var obj = this.$(o);
				if (!obj) {
					return ;
				}
				var className = obj.className;
				var reg = eval("/^" + str + "$|" + str + "$|^" + str + "|" + str + "/");
				if (reg.test(className)) {
					return ;
				}
				if (className !== '') {
					obj.className = className + "" + str;
				} else {
					obj.className = str;
				}
			},
			/*addClass: function (elem, clsName) {
				if (elem.className === '') {
					elem.className = clsName;
				}
				else if (elem.className !== '' && ('' + elem.className + '').indexOf('' + clsName + '') === -1) {
					elem.className = elem.className + '' + clsName;
				}
			},*/
			removeClass: function (o, str) {
				var obj = this.$(o);
				if (!obj) {
					return ;
				}
				var className = obj.className;
				if (this.isNull(className)) {
					var reg = newRegExp(str, "g");
					var n = className.replace(reg, "");
					obj.className = n;
				}
			},
			/*removeClass: function (elem, clsName) {
				if (clsName && ('' + elem.className + '').indexOf('' + clsName + '') > -1) {
					elem.className = ('' + elem.className + '').replace('' + clsName + '', '').replace(/^|$/g, '');
				}
			},*/
			hasClass: function (o, str) {
				if (!o) {
					return ;
				}
				var obj = this.$(o);
				var className = obj.className;
				var reg = eval("/^" + str + "$|" + str + "$|^" + str + "|" + str + "/");
				if (reg.test(className)) {
					return true;
				} else {
					return false;
				}
			},
			html: function (obj, html) {
				if (html) {
					obj.innerHTML = html;
				} else {
					return obj.innerHTML;
				}
			},
			text: function (obj, text) {
				if (text) {
					if (document.textContent) {
						obj.textContent = text;
					} else {
						obj.innerText = text;
					}
				} else {
					if (document.textConten) {
						return obj.textContent;
					} else {
						return obj.innerText;
					}
				}
			},
			//追加Html文本对象(支持Table)
			append: function (elem, text) {
				if ( typeof text === "string") {
					if (elem.insertAdjacentHTML) {
						if (elem.tagName === "TABLE") {
							var html = elem.outerHTML,
							ep = elem.parentNode,
							sl = html.length;
							text = html.substr(0, sl - 8) + text + html.substr(sl - 8, sl);
							ep.insertAdjacentHTML("beforeEnd", text);
							ep.replaceChild(ep.lastChild, elem);
						} else {
							elem.insertAdjacentHTML("beforeEnd", text);
						}
					} else {
						var rlt = null,
						rg = doc.createRange(),
						fm = rg.createContextualFragment(text);
						rlt ? elem.insertBefore(fm, rlt) : elem.appendChild(fm);
					}
				}
				else if( typeof text === "object") elem.appendChild(text);
			},
			//删除元素
			remove: function (elem) {
				if (elem.parentNode) elem.parentNode.removeChild(elem);
			},
			//置空元素内容及子节点
			empty: function (elem) {
				while (elem.firstChild) {
					elem.removeChild(elem.firstChild);
				}
			},
		},
		events: {
			addEvent: function (oTarget, oType, fnHandler) {
				var self = this;
				if (oTarget.addEventListener) {
					oTarget.addEventListener(oType, fnHandler, false);
				}
				else if(oTarget.attachEvent) {
					oTarget.attachEvent('on' + oType, fnHandler);
				} else {
					oTarget['on' + oType] = fnHandler;
				}
			},
			removeEvent: function (oTarget, oType, fnHandler) {
				var self = this;
				if (oTarget.removeEventListener) {
					oTarget.removeEventListener(oType, fnHandler, false);
				}
				else if(oTarget.detachEvent) {
					oTarget.detachEvent('on' + oType, fnHandler);
				} else {
					oTarget['on' + oType] = null;
				}
			},
			getEvent: function (ev) {
				return ev || window.event;
			},
			getTarget: function (ev) {
				return this.getEvent(ev).target || this.getEvent().srcElement;
			},
			stopPropagation: function () {
				if (window.event) {
					return this.getEvent().cancelBubble = true;
				} else {
					return arguments.callee.caller.arguments[0].stopPropagation();
				}
			},
			stopDefault: function () {
				if (window.event) {
					return this.getEvent();
					return Value = false;
				} else {
					return arguments.callee.caller.arguments[0].preventDefault();
				}
			},
			//事件绑定
			bind: function () {
				if (win.addEventListener) {
					return function (elem, sType, fnc) {
						elem.addEventListener(sType, fnc, false);
					};
				}
				else if (win.attachEvent) {
					return function (elem, sType, fnc) {
						elem.attachEvent("on" + sType, fnc);
					};
				} else {
					return function () {};
				}
			},
			//解除事件绑定
			unbind: function (elem, sType, fnc) {
				if (elem.removeEventListener) {
					elem.removeEventListener(sType, fnc, false);
				}
				else if (elem.detachEvent) {
					elem.detachEvent("on" + sType, fnc);
				} else {
					elem["on" + sType] = null;
				}
			},
			//禁止事件冒泡
			stopPropagation: function (ev) {
				if (ev.stopPropagation) {
					ev.stopPropagation();
				} else {
					ev.cancelBubble = true;
				}
			},
			//禁止默认事件动作
			preventDefault: function (ev) {
				if (ev.preventDefault) {
					ev.preventDefault();
				} else {
					ev;
					return Value = false;
				}
			},
		},
		ready: function (loadEvent) {
			if (!loadEvent) {
				return ;
			}
			var init = function () {
				if (arguments.callee.done) {
					return ;
				} else {
					arguments.callee.done = true;
				}
				loadEvent.apply(d, arguments);
			};
			if (d.addEventListener) {
				d.addEventListener("DOMContentLoaded", init, false);
				return ;
			}
			if (safari) {
				var _timer = setInterval(function () {
					if (/loaded|complete/.test(d.readyState)) {
						clearInterval(_timer);
						init();
					}
				},
				10);
			}
			d.write('<scriptid="_ie_onload"defersrc="javascript:void(0)"><\/script>');
			var script = d.getElementById('_ie_onload');
			script.onreadystatechange = function () {
				if (this.readyState == 'complete') {
					init();
				}
			};
			return true;
		},
		storage: {
			setItem: function (strName, strValue) {
				if (Storage) {}
				else if (Storage) {} else {}

			},
			getItem: function (strValue) {},
			removeItem: function (strValue) {},
			removeAll: function () {}

		},
		getScript: function (obj, callback, order) {
			var self = this,
			arr = obj,
			timeout,
			ord = order || true,
			num = 0,
			str = typeof obj === 'string';
			if (!arr) {
				this.Error(prompt.require);
				return ;
			}
			function add() {
				if (arr[0] === undefined) {
					return ;
				}
				var script = KW.Dom.createElement("script", {
					'src': (str ? obj: arr[num]),
					'type': 'text/javascript'
				}),
				header = d.getElementsByTagName("head")[0];
				if (str) {
					if (script.readyState) {
						script.onreadystatechange = function () {
							if (script.readyState === 'loaded' || script.readyState === 'complete') {
								script.onreadystatechange = null;
								callback && callback();
							}
						};
					} else {
						script.onload = function () {
							callback && callback();
						};
					}
				} else {
					if (arr.length >= 1) {
						if (script.readyState) {
							script.onreadystatechange = function () {
								if (script.readyState === 'loaded' || script.readyState === 'complete') {
									script.onreadystatechange = null;
									arr.shift();
									timeout = setTimeout(add, 1);
								}
							};
						} else {
							script.onload = function () {
								arr.shift();
								timeout = setTimeout(add, 1);
							};
						}
					} else {
						clearTimeout(timeout);
						callback && callback();
					}
				}
				header.appendChild(script);
			}
			add();
		},
		ajax: function (obj) {
			if (!obj.url) {
				return false;
			}
			var method = obj.type || "GET";
			var async = obj.async || true;
			var dataType = obj.dataType;
			var XHR = window.XMLHttpRequest ? newXMLHttpRequest() : newActiveXObject("Microsoft.XMLHTTP");
			XHR.open(method, obj.url, async);
			XHR.setRequestHeader('If-Modified-Since', 'Thu,06Apr200600:00:00GMT');
			XHR.send(null);
			if (obj.sendBefore) {
				obj.sendBefore();
			}
			XHR.onreadystatechange = function () {
				if (XHR.readyState == 4 && (XHR.status >= 200 && XHR.status < 300 || XHR.status == 304)) {
					if (obj.success) {
						if (dataType && dataType.toLocaleLowerCase() === "json") {
							obj.success.call(XHR, eval("(" + XHR.responseText + ")"));
						}
						else if (dataType && dataType.toLocaleLowerCase() === "xml") {
							obj.success.call(XHR, XHR.responseXML);
						} else {
							obj.success.call(XHR, XHR.responseText);
						}
					}
					if (obj.complete) {
						obj.complete();
					}
				} else {
					if (obj.complete) {
						obj.complete();
					}
				}
			};
		},
		cookies: {
			//设置cookie
			setCookie: function (sName, sValue, oExpires, sPath, sDomain, bSecure) {
				var sCookie = sName + '=' + encodeURIComponent(sValue);
				if (oExpires) {
					var date = newDate();
					date.setTime(date.getTime() + oExpires * 60 * 60 * 1000);
					sCookie += ';expires=' + date.toUTCString();
				}
				if (sPath) {
					sCookie += ';path=' + sPath;
				}
				if (sDomain) {
					sCookie += ';domain=' + sDomain;
				}
				if (bSecure) {
					sCookie += ';secure';
				}
				d.cookie = sCookie;
			},
			/*setCookie: function (n, v, t) {
				var exp = newDate();
				exp.setTime(exp.getTime() + (t || 24) * 60 * 60 * 1000);
				doc.cookie = n + "=" + escape(v) + ";expires=" + exp.toGMTString() + ';path=/';
			},*/
			//获取cookie
			getCookie: function (sName) {
				var sRE = '(?:;)?' + sName + '=([^;]*)';
				var oRE = newRegExp(sRE);
				if (oRE.test(d.cookie)) {
					return decodeURIComponent(RegExp[$1]);
				} else {
					return null;
				}
			},
			/*getCookie: function (n) {
				var arr = doc.cookie.match(newRegExp("(^|)" + n + "=([^;]*)(;|$)"));
				if (arr != null) return unescape(arr[2]);
				return null;
			},*/
			removeCookie: function (sName, sPath, sDomain) {
				this.setCookie(sName, '', newDate(0), sPath, sDomain);
			},
			clearAllCookie: function () {
				var cookies = d.cookie.split(";");
				var len = cookies.length;
				for (var i = 0; i < len; i++) {
					var cookie = cookies[i];
					var eqPos = cookie.indexOf("=");
					var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
					name = name.replace(/^\s*|\s*$/, "");
					d.cookie = name + "=;expires=Thu,01Jan197000:00:00GMT;path=/";
				}
			}
		},
		tabSort: function (sTableID, iCol, sDataType) { //排序函数，sTableID为目标,iCol哪列排序，为必需，sDataType可选
			var oTable = document.getElementById(sTableID);
			var oTBody = oTable.tBodies[0];
			var colDataRows = oTBody.rows;
			var aTRs = [];
			var len = colDataRows.length;
			function convert(sValue, sDataType) { //类型转，根据不同类型数据排序，比如，整型，日期，浮点，字符串，接受两个参数，一个是值，一个是排序的数据类型
				switch (sDataType) {
				case "int":
					return parseInt(sValue);
				case "float":
					return parseFloat(sValue);
				case "date":
					return newDate(Date.parse(sValue));
				default:
					return sValue.toString();
				}
			}
			function geterateCompareTRs(iCol, sDataType) { //比较函数，用于sort排序用
				return function compareTRs(oTR1, oTR2) {
					var vValue1,
					vValue2;
					if (oTR1.cells[iCol].getAttribute("value")) { //用于高级排序，比如图片，添加一个额外的属性来排序
						vValue1 = convert(oTR1.cells[iCol].getAttribute("value"), sDataType);
						vValue2 = convert(oTR2.cells[iCol].getAttribute("value"), sDataType);
					} else {
						vValue1 = convert(oTR1.cells[iCol].firstChild.nodeValue, sDataType);
						vValue2 = convert(oTR2.cells[iCol].firstChild.nodeValue, sDataType);
					}
					if (vValue1 < vValue2) {
						return  - 1;
					}
					else if (vValue1 > vValue2) {
						return 1;
					} else {
						return 0;
					}
				};
			}
			for (var i = 0; i < len; i++) {
				aTRs[i] = colDataRows[i];
			}
			if (oTable.sortCol == iCol) { //如果已经排序，则倒序
				aTRs.reverse();
			} else {
				aTRs.sort(geterateCompareTRs(iCol, sDataType));
			}
			var oFragment = document.createDocumentFragment();
			var trlen = aTRs.length;
			for (var j = 0; j < trlen; j++) {
				oFragment.appendChild(aTRs[j]);
			}
			oTBody.appendChild(oFragment);
			oTable.sortCol = iCol; //设置一个状态
		},
		escape: function (str) {
			var s = "";
			if (str.length === 0) {
				return  "";
			}
			s = str.replace(/&/g, "&amp;");
			s = s.replace(/</g, "&lt;");
			s = s.replace(/>/g, "&gt;");
			s = s.replace(/ /g,"&nbsp;");
			s = s.replace(/\'/g, "&#39;");
			s = s.replace(/\"/g, "&quot;");
			return s;
		},
		getQueryString: function (name) {
			var reg = newRegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = location.search.substr(1).match(reg);
			if (r !== null) return unescape(r[2]);
			return null;
		},
		error: function (obj, info) {
			if (!this.debug) {
				return ;
			}
			throwError(obj);
		},
		//原生对象扩展
		K: {
			//String原生对象扩展置空左右端空格
			trim: String.prototype.trim,
			format: Date.prototype.format,
			trim: function () {
				return this.replace(/(^[\s\n\t\r]*)|([\s\n\r\t]*$)/g, "");
			},
			//Date原生对象扩展格式化输出
			format: function (string) {
				var self = this;
				var p = function p(s) {
					return  (s.toString().length == 1) ? "0" + s: s;
				};
				return string ? string.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,
				function (string) {
					switch (string) {
					case "hh":
						return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
					case "h":
						return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
					case "HH":
						return p(self.getHours());
					case "H":
						return self.getHours();
					case "mm":
						return p(self.getMinutes());
					case "m":
						return self.getMinutes();
					case "ss":
						return p(self.getSeconds());
					case "s":
						return self.getSeconds();
					case "yyyy":
						return self.getFullYear();
					case "yy":
						return self.getFullYear().toString().substring(2, 4);
					case "dddd":
						return self.getDayName();
					case "ddd":
						return self.getDayName(true);
					case "dd":
						return p(self.getDate());
					case "d":
						return self.getDate().toString();
					case "MMMM":
						return self.getMonthName();
					case "MMM":
						return self.getMonthName(true);
					case "MM":
						return p((self.getMonth() + 1));
					case "M":
						return self.getMonth() + 1;
					case "t":
						return self.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
					case "tt":
						return self.getHours() < 12 ? Date.CultureInfo.amDesignator: Date.CultureInfo.pmDesignator;
					case "zzz":
					case "zz":
					case "z":
						return  "";
					}
				}):
				this.toString();
			},
		},
	};

	//kcool为自己的库名，把方法注册到了kcool这个对象上
	window['kcool']['tools'] = kcool.tools;
	window['kcool']['assembly'] = kcool.assembly;
}) ();
//测试
//kcool.tools.G();