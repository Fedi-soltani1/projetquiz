function usersUpdate(arrUsersSession) {

    var idCompany = $('.company').val();
    var idDirection = $('.direction').val();
    var idService = $('.service').val();
    var url = Routing.generate('users_filter');

    $.ajax({
        url: url,
        type: 'GET',
        data: {'idCompany': idCompany, 'idDirection': idDirection, 'idService': idService},
        dataType: 'json',
        success: function (json) {
            $('.users').empty();
            if(arrUsersSession && arrUsersSession.length > 0){
                for (var i = 0; i < arrUsersSession.length; i++) {
                    $('.users').append('<option value="' + arrUsersSession[i]["id"] + '"  selected="selected">' + arrUsersSession[i]["firstName"] + '  ' + arrUsersSession[i]["lastName"] + '</option>');
                }
            }
            $.each(json, function (index, value) {
                if(arrUsersSession && arrUsersSession.length > 0){
                    var exist = 0;
                    for (var j = 0; j < arrUsersSession.length; j++) {
                        if (arrUsersSession[j]["id"] == value.id) {
                            exist = 1;
                        }
                    }
                    if (exist == 0) {
                        $('.users').append('<option value="' + value.id + '">' + value.firstName + '  ' + value.lastName + '</option>');
                    }
                }else{
                    $('.users').append('<option value="' + value.id + '">' + value.firstName + '  ' + value.lastName + '</option>');
                }
                $('.users').bootstrapDualListbox('refresh', true);

            });
        }
    });
}

function getUsersSession(arrUsersSession) {

    var url = Routing.generate('users_elearning_session');
    var idSession = $('.idSession').val();

    $.ajax({
        url: url,
        type: 'GET',
        data: {'idSession': idSession},
        dataType: 'json',
        success: function (json) {
            $('.users').empty();
            $.each(json, function (index, value) {
                arrUsersSession.push({id: value.id, firstName: value.firstName, lastName: value.lastName});
                $('.users').append('<option  selected="selected"  value="' + value.id + '">' + value.firstName + '  ' + value.lastName + '</option>');
                $('.users').bootstrapDualListbox('refresh', true);
            });
        }
    });

}

function directionsUpdate() {

    var idCompany = $('.company').val();
    var url = Routing.generate('directions_company');

    $.ajax({
        url: url,
        type: 'GET',
        data: {'idCompany': idCompany},
        dataType: 'json',
        success: function (json) {
            $('.direction').empty();
            $('.direction').append('<option value="">Séléctionnez direction</option>');
            $.each(json, function (index, value) {
                $('.direction').append('<option value="' + value.id + '">' + value.name + '</option>');
            });
            $(".direction").select2();

        }
    });
}

function servicesUpdate() {

    var idDirection = $('.direction').val();
    var url = Routing.generate('services_direction');

    $.ajax({
        url: url,
        type: 'GET',
        data: {'idDirection': idDirection},
        dataType: 'json',
        success: function (json) {
            $('.service').empty();
            $('.service').append('<option value="">Séléctionnez service</option>');
            $.each(json, function (index, value) {
                $('.service').append('<option value="' + value.id + '">' + value.name + '</option>');
            });
            $(".service").select2();
        }
    });

}

function refreshDualboxUsers() {

    $('.users').empty();
    $('.users').bootstrapDualListbox('refresh', true);

}

$(document).ready(function () {

    arrUsersSession = [];
    idSession = $('.idSession').val();

    if (idSession != 0) {

        $('.session option[value="' + idSession + '"]').prop('selected', true);
        $(".session").select2("enable", false);
        $(".session").select2();
        getUsersSession(arrUsersSession);
    }

    refreshDualboxUsers();

    if ($('.company').val() === '') {
        $('.direction').empty();
        $('.direction').append('<option value="">Séléctionnez direction</option>');

        $('.service').empty();
        $('.service').append('<option value="">Séléctionnez service</option>');

    }

    $('.company').change(function () {

        if ($('.direction').val() != '') {
            $('.direction').empty();
            $(".direction").select2({
                placeholder: "Selectionnez direction",
                width: '100%'
            });
            $('.service').empty();
            $(".service").select2({
                placeholder: "Selectionnez service",
                width: '100%'
            });
        }

        var typeCompany = $(this).find(':selected').attr('data-value');

        if (typeCompany == 'TYPE_EXTERNE') {

            $('.divDirection').hide();
            $('.divService').hide();

            $('.direction').val(null);
            $('.service').val(null);

            refreshDualboxUsers();
            usersUpdate(arrUsersSession);

        } else {

            $('.divDirection').show();
            $('.divService').show();

            refreshDualboxUsers();
            directionsUpdate();
            usersUpdate(arrUsersSession);
        }

    });

    $('.direction').change(function () {

        if ($('.service').val() != '') {
            $('.service').empty();
            $(".service").select2({
                placeholder: "Selectionnez service"
            });
        }

        refreshDualboxUsers();
        servicesUpdate();
        usersUpdate(arrUsersSession);

    });

    $('.service').change(function () {

        refreshDualboxUsers();
        usersUpdate(arrUsersSession);

    });


});