require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
var getSearch=require('../common/util.js');
$.get('/v6/course/picture',{cs_id:getSearch("cs_id")},function (data) {
    if(data.code==200){
        data.result.Eindex=2;
        $(".course-add").append(template('course-edit2',data.result));
        initPlugin();
    }

});

function initPlugin() {
    //上传图片
    $('#uploadify').uploadify({
        swf: '/lib/jquery-uploadify/uploadify.swf',//这个是flash脚本，必须引入
        uploader: '/v6/uploader/cover',    //上传图片的接口
        fileTypeExts: '*.gif; *.jpg; *.png',
        fileObjName:'cs_cover_original',//用来设置提交的图片在后台中的名称
        formData:{                     //其他需要上传的数据
            cs_id:getSearch("cs_id")
        },
        onUploadSuccess:function (file,dataStr) {  //图片上传成功后的回调
            var data=JSON.parse(dataStr);
            $(".preview img").attr("src",data.result.path);
        }
    });
    
}
$(document).on('mouseover','#upfile-button',function () {
    $('#uploadify').removeClass('uploadify-queue').text("");
})

$(document).on('click',"#btn-warning",function () {
    console.log(1);
    //裁切图片 当裁剪插件初始化之后，会执行回调，回调中的this为插件实例，通过这个实例我们能够得到一些数据
    $('.preview img').Jcrop({
        aspectRatio: 2
    }, function () {
        window.J=this;
    })
});
//委托方式给保存按钮绑定点击事件，点击时把裁剪的数据传送给后端
$(document).on('click','#btn-success',function () {
    var data=J.getSelection();
    data.cs_id=getSearch("cs_id");
    $.post('/v6/course/update/picture',data,function (data) {
        if(data.code==200){
            alert(data.msg);
            location.href='./edit3.html?cs_id='+getSearch("cs_id");

        }
    })
})