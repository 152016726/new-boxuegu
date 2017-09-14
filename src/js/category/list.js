require('../common/aside.js');
require('../common/header.js');
require('../common/common.js');
require('../common/loading.js');

$.get('/v6/category',function (data) {
    var html=template("category",data.result);
    $("tbody").append(html);
})