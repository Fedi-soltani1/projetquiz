var options = {
    "closeButton": true,
    "debug": true,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "2000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
$(function() {

    if($('#toast-container-error').attr('description') !=undefined) {
        toastr.error($('#toast-container-error').attr('description'), $('#toast-container-error').attr('title'), options);
    }
    if($('#toast-container-success').attr('description') !=undefined) {
        toastr.success($('#toast-container-success').attr('description'), $('#toast-container-success').attr('title'), options);
    }
    $('body').confirmation({
        selector: '[data-toggle="confirmation"]'
    });


});