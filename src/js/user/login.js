var stor=JSON.parse(localStorage.getItem("userInfo")).tc_avatar||'/images/default.png';
$(".avatar img").attr('src',stor);

$("#login-form").ajaxForm({
    success:function (data) {
        if(data.code==200){
            alert(data.msg);
            console.log(data.result);
            location.href='/index.html';
            localStorage.setItem("userInfo",JSON.stringify(data.result));

        }
        else{
            alert('登录失败')
        }
    },
    error:function () {
        alert('登录失败');
    }
})


//jquery中阻止页面默认事件如跳转，用return false即可;
