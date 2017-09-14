var isLogin=!!$.cookie('PHPSESSID');//用于是否登录
var isLoginPage=location.pathname=='/dist/html/user/login.html';
if(isLogin&&isLoginPage){
    location.href='/dist';
}else if(!isLoginPage&&!isLogin){
    location.href='/dist/html/user/login.html';
}
