function usersUpdate(arrUsersSession) {

    ;
    var url = Routing.generate('users_filter');

    $.ajax({
        url: url,
        type: 'GET',

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
                        if (arrUsersSession[j]["id"] === value.id) {
                            exist = 1;
                        }
                    }
                    if (exist === 0) {
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





function refreshDualboxUsers() {

    $('.users').empty();
    $('.users').bootstrapDualListbox('refresh', true);

}

$(document).ready(function () {

    arrUsersSession = [];
    idSession = $('.idSession').val();

    if (idSession !== 0) {

        $('.session option[value="' + idSession + '"]').prop('selected', true);
        $(".session").select2("enable", false);
        $(".session").select2();
        getUsersSession(arrUsersSession);
    }

    refreshDualboxUsers();








});