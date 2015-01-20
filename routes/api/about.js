var kcool = require('../../public/lib/kcool');
exports.wendang = function (req, res) {
	res.render('client/doc/inDesign/wendang/index', { title: '十页书｜简单的单页简历'});
}
exports.resume = function (req, res) {
	res.render('client/doc/inDesign/resume/index', { title: '十页书｜复杂的单页简历'});
}
exports.enresume = function (req, res) {
	res.render('client/doc/inDesign/resume/en', { title: '十页书｜Single page resume complex'});
}
exports.paginationApi = function (req, res) {
	res.render('client/doc/inAssembly/pagination-api/index', { title: 'pagination-api'});
}
exports.paginationApiSource = function (req, res) {
	res.render('client/doc/inAssembly/pagination-api/source', { title: 'pagination-api'});
}
exports.kcool = function (req, res) {
	res.render('client/doc/inAssembly/kcool/index', { title: 'kcool'});
}
exports.kcoolSource = function (req, res) {
	res.render('client/doc/inAssembly/kcool/source', { title: 'kcool'});
}
exports.colorGradient = function (req, res) {
	res.render('client/doc/inAssembly/colorGradient/colorGradient', { title: '十页书｜组件'});
}
exports.colorCount = function (req, res) {
	var startColorString = req.body.startColor ? kcool.trim(req.body.startColor):'#fff';
	var endColorString = req.body.endColor ? kcool.trim(req.body.endColor):'#000';
	var numColor = parseInt(req.body.numColor ? kcool.trim(req.body.numColor):'30');
	var oneString = parseInt(req.body.oneString ? kcool.trim(req.body.oneString):'0');
	var twoString = parseInt(req.body.twoString ? kcool.trim(req.body.twoString):'0');
	var threeString = parseInt(req.body.threeString ? kcool.trim(req.body.threeString):'0');

	function gradientColor(startColor,endColor,step,oneString,twoString,threeString){
       startRGB = this.colorRgb(startColor);//转换为rgb数组模式
       startR = startRGB[0];
       startG = startRGB[1];
       startB = startRGB[2];

       endRGB = this.colorRgb(endColor);
       endR = endRGB[0];
       endG = endRGB[1];
       endB = endRGB[2];

       sR = (endR-startR)/step;//总差值
       sG = (endG-startG)/step;
       sB = (endB-startB)/step;

       var colorArr = [];
       for(var i=0;i<step;i++){
           //计算每一步的hex值
           var hex = this.colorHex('rgb('+parseInt((sR*i+startR))+','+parseInt((sG*i+startG))+','+parseInt((sB*i+startB))+')');
           hex = (i+oneString)+"px "+(i+twoString)+"px "+(i+threeString)+"px "+hex;
           colorArr.push(hex);
       }
       // document.write(colorArr)
       return colorArr;
   }

   // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
   gradientColor.prototype.colorRgb = function(sColor){
       var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
       var sColor = sColor.toLowerCase();
       if(sColor && reg.test(sColor)){//test() 方法用于检测一个字符串是否匹配某个模式
           if(sColor.length === 4){
               var sColorNew = "#";
               for(var i=1; i<4; i+=1){
                   sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
               }
               sColor = sColorNew;
           }
           //处理六位的颜色值
           var sColorChange = [];
           for(var i=1; i<7; i+=2){
               sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
           }
           return sColorChange;
       }else{
           return sColor;
       }
   };

   // 将rgb表示方式转换为hex表示方式
   gradientColor.prototype.colorHex = function(rgb){
       var _this = rgb;
       var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
       if(/^(rgb|RGB)/.test(_this)){
           var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g,"").split(",");
           var strHex = "#";
           for(var i=0; i<aColor.length; i++){
               var hex = Number(aColor[i]).toString(16);
               hex = hex<10 ? 0+''+hex :hex;// 保证每个rgb的值为2位
               if(hex === "0"){
                   hex += hex;
               }
               strHex += hex;
           }
           if(strHex.length !== 7){
               strHex = _this;
           }
           return strHex;
       }else if(reg.test(_this)){
           var aNum = _this.replace(/#/,"").split("");
           if(aNum.length === 6){
               return _this;
           }else if(aNum.length === 3){
               var numHex = "#";
               for(var i=0; i<aNum.length; i+=1){
                   numHex += (aNum[i]+aNum[i]);
               }
               return numHex;
           }
       }else{
           return _this;
       }
   }
   var gradient = new gradientColor(startColorString,endColorString,numColor,oneString,twoString,threeString);
   gradient = "box-shadow:"+gradient+";";
	res.render('client/doc/inAssembly/colorGradient/colorCount', { title: '十页书｜组件',startColorString:startColorString,gradient:gradient});
}