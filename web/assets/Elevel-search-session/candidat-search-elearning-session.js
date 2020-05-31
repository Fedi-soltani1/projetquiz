$(document).ready(function () {
    /*search with category solo*/
    $('.inputLevel').change(function () {
        var valIdLevel = $(this).val();

        $.ajax({
            type: 'post',
            url: '/list/'+ valIdLevel,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                var listSessions = '';
                var listFormations = '';
                var nameLevel = '';
                if (valIdLevel !== 0){
                     nameLevel = data['level'] ;
                }else{
                    nameLevel =  'Tous level';
                }
                /*select level*/
                if ((typeof data['sessionsElearning'] !== 'undefined' && data['sessionsElearning'].length > 0)) {
                    $('.listSessionsElearning').addClass('demo');
                    $.each(data['sessionsElearning'], function (key, value) {
                        var link =Routing.generate('detail_bysession', {idSession: value.id});

                        $('.listSessionsElearning').empty();
                        if (data['scoreSessionElearning'][key] == null){
                            listSessions = listSessions + "             <div class=\"col-md-6\" data-score="+data['scoreSessionElearning'][key]+" id=\"session_" + value.id + "\">\n" +
                                "                    <a href=\"" + link + "\">\n" +
                                "                    <div class=\"jumbotron jumbotron-fluid \" style=\"padding: 2px 2px 2px 2px; cursor: pointer;\">\n" +
                                "                        <div class=\"container\">\n" +
                                "                                <h3  style=\"padding-top: 16px;\" class=\"lead nameSession active \"  data-id=" + value.id + "><i class=\"fa fa-chevron-circle-right\" style=\"color: #E10031;\"></i>  " + value.name + "</h3>\n" +
                                "                        </div>\n" +
                                "                    </div>\n" +
                                "                    </a>\n" +
                                "                </div>";
                        }else {
                            listSessions = listSessions + "             <div class=\"col-md-6\" style='opacity: 0.5' disabled='disabled' data-score="+data['scoreSessionElearning'][key]+" id=\"session_" + value.id + "\">\n" +
                                "                    <div class=\"jumbotron jumbotron-fluid \" style=\"padding: 2px 2px 2px 2px; cursor: pointer;\">\n" +
                                "                        <div class=\"container\">\n" +
                                "                                <h3  style=\"padding-top: 16px;\" class=\"lead nameSession \"  data-id=" + value.id + "><i class=\"fa fa-chevron-circle-right\" style=\"color: #E10031;\"></i>  " + value.name + "</h3>\n" +
                                "                        </div>\n" +
                                "                    </div>\n" +
                                "                </div>";
                        }
                        $('.listSessionsElearning').append(listSessions);
                    });
                }else{
                        $('.listSessionsElearning').empty();
                    listSessions = listSessions + "             <div class=\"col-md-12\">\n" +
                            "                    <div class=\"\" style=\"padding: 2px 2px 2px 2px;\">\n" +
                            "                        <div class=\"container\">\n" +
                            "                                <h3  style=\"padding-top: 16px;\" class=\"lead nameSession\">Aucune Formation</h3>\n" +
                            "                        </div>\n" +
                            "                    </div>\n" +
                            "                </div>";

                        $('.listSessionsElearning').append(listSessions);
                }
                /*auto remplir champs formation selon level*/
                if ((typeof data['formationByLevel'] !== 'undefined' && data['formationByLevel'].length > 0)) {

                    $('.searchFormations').show();
                    $('.listFormations').empty();
                    listFormations = listFormations + '<option value="0" selected>Selectionnez formation par '+nameLevel+'</option>';
                    $.each(data['formationByLevel'], function (key, value) {
                        listFormations = listFormations + '<option value="'+value.id+'">'+value.name+'</option>';
                        $('.listFormationsSelect').append(listFormations);
                    });
                    $(".listFormationsSelect").html(listFormations);
                    $(".listFormationsSelect").select2();
                    $(".listFormationsSelect").select2({
                        placeholder: "Selectionnez formation"
                    });
                }else{
                    $('.searchFormations').hide();
                }
            },
            error: function () {
            }
        });

    });

    /*search with formation selon level*/
    $('.inputFormation').change(function () {
        var valIdFormation = $(this).val();
        var path = Routing.generate('filter_by_Formation', {idFormation: valIdFormation});
        $.ajax({
            type: 'POST',
            url: path,
            dataType: 'json',
            cache: false,
            data: {valIdFormation: valIdFormation},
            success: function (data) {
                console.log(data);

                var listSessions = '';
                /*select level*/
                if (data['scoreSessionElearning']  !== null) {
                    $.each(data['sessionsElearning'], function (key, value) {
                        var link =Routing.generate('detail_bysession', {idSession: value.id});
                        $('.listSessionsElearning').empty();
                        if (data['scoreSessionElearning'][key] == null){
                            listSessions = listSessions + "             <div class=\"col-md-6\" data-score="+data['scoreSessionElearning'][key]+" id=\"session_" + value.id + "\">\n" +
                                "                    <a href=\"" + link + "\">\n" +
                                "                    <div class=\"jumbotron jumbotron-fluid \" style=\"padding: 2px 2px 2px 2px; cursor: pointer;\">\n" +
                                "                        <div class=\"container\">\n" +
                                "                                <h3  style=\"padding-top: 16px;\" class=\"lead nameSession active \"  data-id=" + value.id + "><i class=\"fa fa-chevron-circle-right\" style=\"color: #E10031;\"></i>  " + value.name + "</h3>\n" +
                                "                        </div>\n" +
                                "                    </div>\n" +
                                "                    </a>\n" +
                                "                </div>";
                        }else {
                            listSessions = listSessions + "             <div class=\"col-md-6\" style='opacity: 0.5' disabled='disabled' data-score="+data['scoreSessionElearning'][key]+" id=\"session_" + value.id + "\">\n" +
                                "                    <div class=\"jumbotron jumbotron-fluid \" style=\"padding: 2px 2px 2px 2px; cursor: pointer;\">\n" +
                                "                        <div class=\"container\">\n" +
                                "                                <h3  style=\"padding-top: 16px;\" class=\"lead nameSession \"  data-id=" + value.id + "><i class=\"fa fa-chevron-circle-right\" style=\"color: #E10031;\"></i>  " + value.name + "</h3>\n" +
                                "                        </div>\n" +
                                "                    </div>\n" +
                                "                </div>";
                        }
                        $('.listSessionsElearning').append(listSessions);
                    });
                }else{
                    $('.listSessionsElearning').empty();
                    listSessions = listSessions + "             <div class=\"col-md-6\">\n" +
                        "                    <div class=\"\" style=\"padding: 2px 2px 2px 2px;\">\n" +
                        "                        <div class=\"container\">\n" +
                        "                                <h3  style=\"padding-top: 16px;\" class=\"lead nameSession\">Aucune Formation</h3>\n" +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                </div>";

                    $('.listSessionsElearning').append(listSessions);
                }
            },
            error: function () {
            }
        });

    })

});
