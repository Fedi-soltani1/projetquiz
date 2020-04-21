$(document).ready(function () {
    $('#rootwizard').bootstrapWizard({


        onTabShow: function (tab, navigation, index) {

            var total = navigation.find('li').length;
            var current = index + 1;
            var percent = (current / total) * 100;
            $('.pdf-container'+current).pdfviewer({
                scale: 2,
                onDocumentLoaded: function() {
                    var num = $(this).data('pdfviewer').pages();
                    $(this).data('pdfviewer').autoFit();
                    $(this).data('pdfviewer').autoFitScaleByWidth();
                    //alert('onDocumentLoaded:'+num);
                },

                onPrevPage: function() {
                    //alert('onPrevPage');
                    return true;
                },
                onNextPage: function() {
                    //alert('onNextPage');
                    return true;
                },
                onBeforeRenderPage: function(num) {
                    //alert('onBeforeRenderPage');
                    return true;
                },
                onRenderedPage: function(num) {
                    //alert('onRenderedPage');
                }
            });


            if (percent > 50) {
                $('#barMedias').removeClass('progress-bar progress-bar-danger').addClass('progress-bar progress-bar-warning');

            }
            if (percent === 100) {
                $('#barMedias').removeClass('progress-bar progress-bar-warning').addClass('progress-bar progress-bar-success');
                $('.btnNext').hide();
                $('.finish').show();
                $('.next.disabled').addClass('hidden');

            }

            if (percent < 100) {
                $('.next').removeClass('hidden');
                $('.btnNext').show();
                $('.finish').hide();


            }



            $('#rootwizard .progress-bar').css({width: percent + '%'});
        }
    });

});