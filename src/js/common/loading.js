var loadingImage='<div class="overlay">'+'<img src="/uploads/loading.gif"/>'+'</div>';
$('body').append(loadingImage);
$(document).on('ajaxStart',function () {
    $('overlay').show();
});
$(document).on('ajaxStop',function () {
    $('overlay').hide();
});