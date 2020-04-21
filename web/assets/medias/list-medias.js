$(document).ready(function () {
    $("#sample_2").on("click", ".mediaModel", function(){
            var modal = '';
            var id = $(this).attr('id');
            var src = $(this).data('src');         // $('#modal'+id).on('hidden.bs.modal', function (e) {
            var type = $(this).data('type');
            var name = $(this).data('name');
            console.log(id);
            if (type == 'TYPE_VIDEO') {
                modal = '                                <div class="modal fade" id="modal'+id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n' +
                    '                                    <div class="modal-dialog modal-lg" role="document">\n' +
                    '\n' +
                    '                                        <!--Content-->\n' +
                    '                                        <div class="modal-content">\n' +
                    '                                            <!--Body-->\n' +
                    '                                            <div class="modal-body mb-0 p-0">\n' +
                    '                                                <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">\n' +
                    '                                                    <video id="myVideo" controls>\n' +
                    '                                                        <source id="mp4_src" src="'+src+'" type="video/mp4">\n' +
                    '                                                    </video>\n' +
                    '                                                </div>\n' +
                    '                                            </div>\n' +
                    '                                            <!--Footer-->\n' +
                    '                                            <div class="modal-footer ">\n' +
                    '                                                <h6 class="pull-left">' + name + '</h6>\n' +
                    '                                                <button type="button" class="btn btn-danger btn-rounded btn-md ml-4" data-dismiss="modal">Fermer</button>\n' +
                    '                                            </div>\n' +
                    '\n' +
                    '                                        </div>\n' +
                    '                                        <!--/.Content-->\n' +
                    '                                    </div>\n' +
                    '                                </div>';

            } else if (type == 'TYPE_PHOTO') {

                modal = '                                                                <div class="modal fade" id="modal'+id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n' +
                    '                                                                    <div class="modal-dialog modal-lg" role="document">\n' +
                    '\n' +
                    '                                                                        <!--Content-->\n' +
                    '                                                                        <div class="modal-content">\n' +
                    '                                                                            <!--Body-->\n' +
                    '                                                                            <div class="modal-body mb-0 p-0">\n' +
                    '\n' +
                    '                                                                                <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">\n' +
                    '                                                                                    <img class="embed-responsive-item" src="'+src+'"/>\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                            <!--Footer-->\n' +
                    '                                                                            <div class="modal-footer ">\n' +
                    '                                                                                <h6 class="pull-left">' + name + '</h6>\n' +
                    '                                                                                <button type="button" class="btn btn-danger btn-rounded btn-md ml-4" data-dismiss="modal">Fermer</button>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <!--/.Content-->\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>';

            } else {
                modal = '                                                                <div class="modal fade" id="modal'+id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n' +
                    '                                                                    <div class="modal-dialog modal-lg" role="document">\n' +
                    '\n' +
                    '                                                                        <!--Content-->\n' +
                    '                                                                        <div class="modal-content">\n' +
                    '                                                                            <!--Body-->\n' +
                    '                                                                            <div class="modal-body mb-0 p-0">\n' +
                    '                                                                                <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">\n' +
                    '                                                                                    <iframe class="embed-responsive-item" src="'+src+'"\n' +
                    '                                                                                    ></iframe>\n' +
                    '                                                                                </div>\n' +
                    '                                                                            </div>\n' +
                    '                                                                            <!--Footer-->\n' +
                    '                                                                            <div class="modal-footer ">\n' +
                    '                                                                                <h6 class="pull-left">'+name+'</h6>\n' +
                    '                                                                                <button type="button" class="btn btn-danger btn-rounded btn-md ml-4" data-dismiss="modal">Fermer</button>\n' +
                    '                                                                            </div>\n' +
                    '                                                                        </div>\n' +
                    '                                                                        <!--/.Content-->\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>';

            }
            $('#divModal').empty();
            $('#divModal').append(modal);
            $('#modal'+id).modal('show');
            $('#modal'+id).on('hidden.bs.modal', function () {
                $('#divModal').empty();
                $('#divModal').append(modal);
                $(this).data('bs.modal', null);
            });
        });

});
