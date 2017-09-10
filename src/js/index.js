$("#backend").on("click",function () {
    $.ajax({
        type:'post',
        url:'/v6/logout',
        dataType:'json',
        success:function (result) {
            console.log(result);
            if(result.code=='200'){
                alert(result.msg);
                location.href='/dist/html/user/login.html';
            }
        }
    })
})
var user=JSON.parse(localStorage.getItem('userInfo'));
console.log(user);
$('#avatar').attr('src',user.tc_avatar);
$('#monitar').text(user.tc_name);
