require('../../js/common/aside.js');
require('../../js/common/header.js');

$.get('/v6/category',function (data) {
    var html=template("category",data.result);
    $("tbody").append(html);
})