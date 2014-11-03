/**
 * New node file
 */
module.exports = (function(){
    var _value = 1;//在函数内声明一个变量，作用域是函数内

    return function(){ //返回的一个function能访问到_value，所以_value并不是global级别的变量，但是可以通过这个接口访问到
        return _value++;
    };

})();//一个立即执行的匿名函数