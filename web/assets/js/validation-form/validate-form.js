var FormValidatorTotalTAsk = function () {
    "use strict";
    var requiredMsg = 'ce champ est obligatoire';
    var requiredMsgDatedebut = 'ce champ est obligatoire';
    var requiredMsgDatefin = 'ce champ est obligatoire';
    var requiredMsgSelect = 'ce champ est obligatoire';
    var requiredMsgchecked ='ce champ est obligatoire';
    var requiredMsgpwd = "les mots de passe saisis ne sont pas identiques.\n";
    var requiredMsgLenghtpwd = "Veuillez ne pas entrer plus de 6 caractères.\n.\n";


    var runValidatorformLevel= function () {
        var formLevel = $('#formLevel');
        $('#formLevel').validate({
            errorElement: "span", // contain the error msg in a span tag
            errorClass: 'help-block',
            ignore: "",
            rules: {
                "level[name]": {
                    minlength: 2,
                    required: true
                }

            },
            messages: {
                "level[name]": requiredMsg
            },
            highlight: function (element) {
                $(element).closest('.help-block').removeClass('valid');
                // display OK icon
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error').find('.symbol').removeClass('ok').addClass('required');
                // add the Bootstrap error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error');
                // set error class to the control group
            },
            success: function (label, element) {
                label.addClass('help-block valid');
                // mark the current input as valid and display OK icon
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success').find('.symbol').removeClass('required').addClass('ok');
            },

        });
    };

    var runValidatorformMedias = function () {
        var formMedias = $('#formMedias');
        var errorHandler1 = $('.errorHandler', formMedias);
        var successHandler1 = $('.successHandler', formMedias);

        $('#formMedias').validate({
            errorElement: "span", // contain the error msg in a span tag
            errorClass: 'help-block',
            ignore: "",
            rules: {
                'medias[choice]': {required: true},
                'medias[name]': {required: true},
                'medias[file]': {required: true,  extension: "pdf|png|jpg|jpeg|mp4|mov|avi"
                    // , accept: "vedio/*|image/*"

                }
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "medias[choice]" || element.attr("name") == "media[name]" || element.attr("name") == "medias[file]") {
                    //error.insertAfter(".input-group");
                    error.insertAfter(element.parent('.input-group'));
                } else {
                    error.insertBefore(element);

                }
            },
            messages: {

                'medias[choice]': {required: requiredMsgchecked},
                'medias[name]': {required: requiredMsg},
                'medias[file]': {required: 'veuillez sélectionner un fichier',  extension:"select valied input file format"
                }
            },


            invalidHandler: function (event, validator) { //display error alert on form submit
                successHandler1.hide();
                errorHandler1.show();

            },
            highlight: function (element) {
                $(element).closest('.help-block').removeClass('valid');
                // display OK icon
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error').find('.symbol').removeClass('ok').addClass('required');
                // add the Bootstrap error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error');
                // set error class to the control group
            },
            success: function (label, element) {
                label.addClass('help-block valid');
                // mark the current input as valid and display OK icon
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success').find('.symbol').removeClass('required').addClass('ok');
            },

        });
    };

    var runValidatorformSessionElearning = function () {
        var formSessionElearning = $('#formSessionElearning');
        var errorHandler1 = $('.errorHandler', formSessionElearning);
        var successHandler1 = $('.successHandler', formSessionElearning);


        $('#formSessionElearning').validate({
            errorElement: "span", // contain the error msg in a span tag
            errorClass: 'help-block',

            ignore: "",
            rules: {
                'elearning_session[name]': {required: true}

            },
            errorPlacement: function (error, element) {
                if (element.attr("name") === "presentiel_session[startDate]" || element.attr("name") === "presentiel_session[endDate]") {
                    //error.insertAfter(".input-group");
                    error.insertBefore(element.parent('.input-group'));
                } else {
                    error.insertAfter(element);
                }
            },

            messages: {
                'elearning_session[name]': {required: requiredMsg}


            },


            invalidHandler: function (event, validator) { //display error alert on form submit
                successHandler1.hide();
                errorHandler1.show();
            },
            highlight: function (element) {
                $(element).closest('.help-block').removeClass('valid');
                // display OK icon
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error').find('.symbol').removeClass('ok').addClass('required');
                // add the Bootstrap error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error');
                // set error class to the control group
            },
            success: function (label, element) {
                label.addClass('help-block valid');
                // mark the current input as valid and display OK icon
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success').find('.symbol').removeClass('required').addClass('ok');
            },

        });
    };
    var runValidatorformQuestion = function () {
        var formQuestion = $('#formQuestion');
        var errorHandler1 = $('.errorHandler', formQuestion);
        var successHandler1 = $('.successHandler', formQuestion);


        $('#formQuestion').validate({
            errorElement: "span", // contain the error msg in a span tag
            errorClass: 'help-block',

            ignore: "",
            rules: {
                'question[label]': {required: true},
                'question[type]': {required: true},
                'question[formations][]': {required: true},
              /*  'question[media]': {required: true}*/

            },


            messages: {
                'question[label]': {required: requiredMsg},
                'question[type]': {required: requiredMsg},
                'question[formations][]': {required: requiredMsgSelect},
               /* 'question[media]': {required: requiredMsg}*/


            },


            invalidHandler: function (event, validator) { //display error alert on form submit
                successHandler1.hide();
                errorHandler1.show();
            },
            highlight: function (element) {
                $(element).closest('.help-block').removeClass('valid');
                // display OK icon
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error').find('.symbol').removeClass('ok').addClass('required');
                // add the Bootstrap error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error');
                // set error class to the control group
            },
            success: function (label, element) {
                label.addClass('help-block valid');
                // mark the current input as valid and display OK icon
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success').find('.symbol').removeClass('required').addClass('ok');
            },

        });

    };
    var runValidatorformChangePassword = function () {
        var formChangePassword = $('#formChangePassword');
        var errorHandler1 = $('.errorHandler', formChangePassword);
        var successHandler1 = $('.successHandler', formChangePassword);


        $('#formChangePassword').validate({
            errorElement: "span", // contain the error msg in a span tag
            errorClass: 'help-block',

            ignore: "",
            rules: {
                'change_password[currentPassword]': {required: true,  minlength:6},
                'change_password[newPassword][first]': {required: true,  minlength:6},
                'change_password[newPassword][second]': {required: true, equalTo: '#change_password_newPassword_first', minlength:6}

            },


            messages: {
                'change_password[currentPassword]': {required: requiredMsg,  minlength: requiredMsgLenghtpwd},
                'change_password[newPassword][first]': {required: requiredMsg, minlength: requiredMsgLenghtpwd},
                'change_password[newPassword][second]': {required: requiredMsg, equalTo: requiredMsgpwd, minlength: requiredMsgLenghtpwd}

            },


            invalidHandler: function (event, validator) { //display error alert on form submit
                successHandler1.hide();
                errorHandler1.show();
            },
            highlight: function (element) {
                $(element).closest('.help-block').removeClass('valid');
                // display OK icon
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error').find('.symbol').removeClass('ok').addClass('required');
                // add the Bootstrap error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error');
                // set error class to the control group
            },
            success: function (label, element) {
                label.addClass('help-block valid');
                // mark the current input as valid and display OK icon
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success').find('.symbol').removeClass('required').addClass('ok');
            },

        });
    };
    var runValidatorformFormation = function () {
        var formFormation = $('#form');
        var errorHandler1 = $('.errorHandler', formFormation);
        var successHandler1 = $('.successHandler', formFormation);
        $.validator.addMethod("FullDate", function () {
            //if all values are selected
            if ($("#dd").val() != "" && $("#mm").val() != "" && $("#yyyy").val() != "") {
                return true;
            } else {
                return false;
            }
        }, 'Please select a day, month, and year');
        $('#formFormation').validate({
            errorElement: "span", // contain the error msg in a span tag
            errorClass: 'help-block',
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.attr("type") == "radio" || element.attr("type") == "checkbox") { // for chosen elements, need to insert the error after the chosen container
                    error.insertAfter($(element).closest('.form-group').children('div').children().last());
                } else if (element.attr("name") == "dd" || element.attr("name") == "mm" || element.attr("name") == "yyyy") {
                    error.insertAfter($(element).closest('.form-group').children('div'));
                } else {
                    error.insertAfter(element);
                    // for other inputs, just perform default behavior
                }
            },
            ignore: "",
            rules: {
                'formation[name]': {required: true},
                'formation[score]': {required: true},
                'formation[time]': {required: true},

            },
            messages: {
                'formation[name]': {required: requiredMsg},
                'formation[score]': {required: requiredMsg},
                'formation[time]': {required: requiredMsg},

            },
            groups: {
                DateofBirth: "dd mm yyyy",
            },
            invalidHandler: function (event, validator) { //display error alert on form submit
                successHandler1.hide();
                errorHandler1.show();
            },
            highlight: function (element) {
                $(element).closest('.help-block').removeClass('valid');
                // display OK icon
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error').find('.symbol').removeClass('ok').addClass('required');
                // add the Bootstrap error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error');
                // set error class to the control group
            },
            success: function (label, element) {
                label.addClass('help-block valid');
                // mark the current input as valid and display OK icon
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success').find('.symbol').removeClass('required').addClass('ok');
            },

        });
    };
    /*var runValidatorformManagerChangePassword = function () {
        var formManagerChangePassword = $('#formManagerChangePassword');
        var errorHandler1 = $('.errorHandler', formManagerChangePassword);
        var successHandler1 = $('.successHandler', formManagerChangePassword);
        $.validator.addMethod("FullDate", function () {
            //if all values are selected
            if ($("#dd").val() != "" && $("#mm").val() != "" && $("#yyyy").val() != "") {
                return true;
            } else {
                return false;
            }
        }, 'Please select a day, month, and year');
        $('#formManagerChangePassword').validate({
            errorElement: "span", // contain the error msg in a span tag
            errorClass: 'help-block',
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.attr("type") == "radio" || element.attr("type") == "checkbox") { // for chosen elements, need to insert the error after the chosen container
                    error.insertAfter($(element).closest('.form-group').children('div').children().last());
                } else if (element.attr("name") == "dd" || element.attr("name") == "mm" || element.attr("name") == "yyyy") {
                    error.insertAfter($(element).closest('.form-group').children('div'));
                } else {
                    error.insertAfter(element);
                    // for other inputs, just perform default behavior
                }
            },
            ignore: "",
            rules: {
                'change_password[newPassword][first]': {required: true, minlength:6},
                'change_password[newPassword][second]': {required: true, equalTo: '#change_password_newPassword_first', minlength:6}
            },
            messages: {
                'change_password[newPassword][first]': {required: requiredMsg, minlength: requiredMsgLenghtpwd},
                'change_password[newPassword][second]': {required: requiredMsg, equalTo: requiredMsgpwd, minlength: requiredMsgLenghtpwd}

            },


            highlight: function (element) {
                $(element).closest('.help-block').removeClass('valid');
                // display OK icon
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error').find('.symbol').removeClass('ok').addClass('required');
                // add the Bootstrap error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error');
                // set error class to the control group
            },
            success: function (label, element) {
                label.addClass('help-block valid');
                // mark the current input as valid and display OK icon
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success').find('.symbol').removeClass('required').addClass('ok');
            },

        });
    };*/



    return {
        init: function () {
            // validateCheckRadio();
            runValidatorformLevel();

            runValidatorformMedias();

            runValidatorformSessionElearning();
            runValidatorformQuestion();
            runValidatorformChangePassword();
            runValidatorformFormation();

        }
    };
}();
