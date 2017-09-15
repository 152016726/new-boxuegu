require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');
var getSearch=require('../common/util.js');
var lessons;

//页面信息回显
$.get("/v6/course/lesson",{cs_id:getSearch("cs_id")},function (data) {
    if(data.code==200){
        data.result.Eindex=3;
        lessons=data.result.lessons;
        console.log(lessons);
        alert(data.msg);
        $('.course-add').html(template("course-form-edit3",data.result));
    }
});

//编辑信息回显页面
$(document).on("click","#btn-info",function () {
    $.get("/v6/course/chapter/edit",{ct_id:$(this).attr('data-id')},function (data) {
        if(data.code==200){
            $("#chapterModal").html(template("course-tem-edit3",data.result));
        }
    })
});
//编辑信息和添加页面的提交数据
// 定义和用法
// prop() 方法设置或返回被选元素的属性和值。
// 当该方法用于返回属性值时，则返回第一个匹配元素的值。
// 当该方法用于设置属性值时，则为匹配元素集合设置一个或多个属性/值对。
// 注意：prop() 方法应该用于检索属性值，例如 DOM 属性（如 selectedIndex, tagName, nodeName, nodeType, ownerDocument, defaultChecked, 和 defaultSelected）。
// 提示：如需检索 HTML 属性，请使用 attr() 方法代替。
// 提示：如需移除属性，请使用 removeProp() 方法。
// 语法
// 返回属性的值：
// $(selector).prop(property)
// 设置属性和值：
// $(selector).prop(property,value)
// 使用函数设置属性和值：
// $(selector).prop(property,function(index,currentvalue))
// 设置多个属性和值：
// $(selector).prop({property:value, property:value,...})
$("#course-modal-edit3").ajaxForm({
    delegation:true,
    beforeSubmit:function (arrData,$form,options) {
            arrData.push({
                name:'ct_is_free',
                value:$('#ct_is_free').prop('checked')?1:0
            })
    },
    success:function (data) {
        var formArr=$('#course-modal-edit3').serializeArray();
        if(data.code==200){
            if(data.result){
                alert('添加成功');
                upLesson(data.result);
                console.log(lessons);
                $('#course-modal-edit3').get(0).reset();
            }else{
                alert("修改成功");
                upLesson();
                console.log(lessons);
            }
        }
    }
});
//添加章节回显信息
$(document).on('click','#add_chapter',function () {
    $("#chapterModal").html(template("course-tem-edit3",{ct_cs_id:getSearch("cs_id")}));
});

function upLesson(ct_id) {
    var formData=getFormData();
    var formArr={
        ct_id:ct_id||formData.ct_id,
        ct_name:formData.ct_name,
        ct_video_duration:formData.ct_minutes+":"+formData.ct_seconds
    };

    if(ct_id){
        lessons.push(formArr);
    }else{
        var index=getLessonIndex(formData.ct_id);
        lessons.splice(index,1,formArr);
    }

    $("#lesson-list").html(template('lesson-list-tpl',lessons));



    function getFormData(){
            var formArrData=$('#course-modal-edit3').serializeArray();
            var formData={};
            for(var i=0;i<formArrData.length;i++){
                formData[formArrData[i].name]=formArrData[i].value;
            }
            return formData;
    }

    function getLessonIndex(ct_id){
        for(var i=0;i<lessons.length;i++){
            if(lessons[i].ct_id==ct_id){
                return i;
            }
        }
    }
}




