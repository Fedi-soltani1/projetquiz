$(document).ready(function () {
    /*search with category solo*/
    $('.inputCategory').change(function () {
        var valIdCategory = $(this).val();
         var path = Routing.generate('admin_candidat_elearning_session_by_categorie', {idCat: valIdCategory});
        $.ajax({
            type: 'POST',
            url: path,
            dataType: 'json',
            cache: false,
            data: {valIdCategory: valIdCategory},
            success: function (data) {
                console.log(data);
                var listSessions = '';
                var listFormations = '';
                var nameCategory = '';
                if (valIdCategory != 0){
                     nameCategory = data['category'] ;
                }else{
                    nameCategory =  'Tous catégories';
                }
                /*select category*/
                if ((typeof data['sessionsElearning'] !== 'undefined' && data['sessionsElearning'].length > 0)) {
                    $('.listSessionsElearning').addClass('demo');
                    $.each(data['sessionsElearning'], function (key, value) {
                        var link =Routing.generate('admin_candidat_detail_elearning_session_by_formation', {idSession: value.id});

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
                /*auto remplir champs formation selon le categorie*/
                if ((typeof data['formationByCat'] !== 'undefined' && data['formationByCat'].length > 0)) {

                    $('.searchFormations').show();
                    $('.listFormationsSelect').empty();
                    listFormations = listFormations + '<option value="0" selected>Selectionnez formation par '+nameCategory+'</option>';
                    $.each(data['formationByCat'], function (key, value) {
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

    /*search with formation selon le category*/
    $('.inputFormation').change(function () {
        var valIdFormation = $(this).val();
        var path = Routing.generate('admin_candidat_elearning_session_by_formation', {idFormation: valIdFormation});
        $.ajax({
            type: 'POST',
            url: path,
            dataType: 'json',
            cache: false,
            data: {valIdFormation: valIdFormation},
            success: function (data) {
                console.log(data);

                var listSessions = '';
                /*select category*/
                if (data['scoreSessionElearning']  !== null) {
                    $.each(data['sessionsElearning'], function (key, value) {
                        var link =Routing.generate('admin_candidat_detail_elearning_session_by_formation', {idSession: value.id});
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
