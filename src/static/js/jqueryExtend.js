$.fn.extend({
    qiaodaima:function(htmldom){
        $(this).text("敲代码");
    }
});
// 测试
// $(".class").qiaodaima();

$.extend({
    /**
     * 删除数组中指定元素
     * @param {*} arr 数组
     * @param {*} val 需要删除的元素
     */
    removeArrVal:function(arr , val){
        if(!(arr instanceof Array)){
            return ;
        }
        for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    },
    /**
     * 验证手机号
     * @param {*} phone 手机号
     */
    isPoneAvailable:function(phone) {
        var myreg=/^[1][3,4,5,6,7,8][0-9]{9}$/;
        if (!myreg.test(phone)) {
            return false;
        } else {
            return true;
        }
    },
    //检查是什么浏览器
    getExplorer:function() {
        localStorage.setItem('ie9','true')
        var explorer = window.navigator.userAgent ;
        if (explorer.indexOf("MSIE 9.0") >= 0) {//ie 
            return "ie9";
        }else if (explorer.indexOf("Firefox") >= 0) {//firefox
            return "Firefox"; 
        }else if(explorer.indexOf("Chrome") >= 0){//Chrome
            return "Chrome";
        }else if(explorer.indexOf("Opera") >= 0){//Opera
            return "Opera";
        }else if(explorer.indexOf("Safari") >= 0){//Safari
            return "Safari";
        }
    },
    // 判断字符是否为空的方法
    isEmpty:function(obj){
        if(typeof obj == "undefined" || obj == null || obj == ""){
            return false;
        }else{
            return true;
        }
    }
})