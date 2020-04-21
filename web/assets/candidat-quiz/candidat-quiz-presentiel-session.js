var isPaused = false;
var nbQuestionCorrect = 1;
var score = 0;
var totalQuestionCorrect = 0;
var timeTest = 0;
var idSessionCurrent;
var scoreQuizUser = 0;
var scoreForFormation = 0;
var searchInputCheckedUser;
var ArrayIdQ = [];
var current;
var idQ = 0;
var statusQuestion = 0;
var statUserQuiz = [];
var valInputChecked = [];
var typeQuestion = '';
$('#downloadAttestation').hide();
var timeQuiz;

/* start time auto */
function time() {
    var output = $('span.time.colortmp');
    timeQuiz = $('#timeQuiz').data('time');
    var time = timeQuiz;
    var t = window.setInterval(function () {
        if (!isPaused) {
            time--;
            output.text(time);
            if (time === 0) {
                CalculScoreQuiz();
            }
        }
    }, 1000);
}
/* lance quiz */

function lanceQuiz() {
    $('.diapo1').hide();
    playQuiz();
}
function playQuiz() {
    $('.diapo2').show();
    time();
    nextQuiz();
}
function nextQuiz() {
    isPaused = false;
    $('#rootwizard').bootstrapWizard({
        /*start time*/
        onTabShow: function (tab, navigation, index) {
            var total = navigation.find('li').length;
            var current = index + 1;
            var percent = (current / total) * 100;
            /*single choice or multiple*/
            typeQuestion = $('#typeQuestion' + current).val();
            idQ = $('#typeQuestion' + current).data('id');
            if (typeQuestion === 'TYPE_SINGLE_CHOICE ') {
                $('.choice' + idQ).removeClass('checkbox clip-check check-danger check-md').addClass('radio clip-radio radio-danger radio-md');
                $('.answer' + idQ).attr("type", "radio");
            }
            if ($('.checkrep' + idQ).change(function () {
                $(this).toggleClass('checked');
                $('.btnValide').show();
                $('.btnNextQues').hide();
            }))
                if (percent > 50) {
                    $('#barQuiz').removeClass('progress-bar progress-bar-danger').addClass('progress-bar progress-bar-warning');
                }
            if (percent === 100) {
                $('#barQuiz').removeClass('progress-bar progress-bar-warning').addClass('progress-bar progress-bar-success');
                $('.btnNextQues').hide();
                $('#btnValide').hide();
                $('.next.disabled').addClass('hidden');
            }
            $('#rootwizard .progress-bar').css({width: percent + '%'});
            var pourcentQuiz = (percent.toFixed(0)) + ' Complete';
            $('#barprogress').text(pourcentQuiz+'%');
        }

    });
}
/*stop time + validate les reponse  */
function stopTime(idQuestion) {
    var typeInput = $('.answer' + idQuestion).prop('type');
    ArrayIdQ.push(idQuestion);
    isPaused = true;
    $('.choice'+idQuestion).addClass('styleAnswerverif');
    searchInputCheckedUser = $('input[name="answer' + idQuestion + '"]').each(function () {
        if ($(this).is(':checked')) {
            valInputChecked = $(this).val();
            idAnswer = $(this).data('id');
            if (valInputChecked == "1") {
                $('#labelReponse' + idAnswer).addClass('quesValid');
                $('.labelReponse' + idAnswer).addClass('quesValid');
                $('.checkrep' + idQuestion).hide();
                if (typeInput == 'radio') {
                    $('#divCheckvalid' + idAnswer).removeClass('radio clip-radio radio-danger radio-md').addClass('correct checked answerCheckValid' + idQuestion);
                } else {
                    $('#divCheckvalid' + idAnswer).removeClass('checkbox clip-check check-danger check-md').addClass('correct checked answerCheckValid' + idQuestion);
                }
                $('#checkVerif' + idAnswer).html('<i class="ti-check" ></i>');
            } else {
                if (typeInput == 'radio') {
                    $('#divCheckvalid' + idAnswer).removeClass('radio clip-radio radio-danger radio-md');
                } else {
                    $('#divCheckvalid' + idAnswer).removeClass('checkbox clip-check check-danger check-md');
                }
                $('#labelReponse' + idAnswer).addClass('quesError');
                $('.labelReponse' + idAnswer).addClass('quesError');
                $('.checkrep' + idQuestion).hide();
                $('#checkVerif' + idAnswer).html('<i class="ti-close" ></i>');
            }
        } else {
            var valInputNoChecked = $(this).val();
            var idAnswer2 = $(this).data('id');
            if (valInputNoChecked == "1") {
                if (typeInput == 'radio') {
                    $('#divCheckvalid' + idAnswer2).removeClass('radio clip-radio radio-danger radio-md');
                } else {
                    $('#divCheckvalid' + idAnswer2).removeClass('checkbox clip-check check-danger check-md');
                }
                $('#labelReponse' + idAnswer2).addClass('quesValidAuto');
                $('.labelReponse' + idAnswer2).addClass('quesValidAuto');
                $('.checkrep' + idQuestion).hide();
                $('#checkVerif' + idAnswer2).html('<i class="ti-check" ></i>');
            } else {
                $('#labelReponse' + idAnswer2).addClass('quesError');
                $('.labelReponse' + idAnswer2).addClass('quesError');
                if (typeInput == 'radio') {
                    $('#divCheckvalid' + idAnswer2).removeClass('radio clip-radio radio-danger radio-md');
                } else {
                    $('#divCheckvalid' + idAnswer2).removeClass('checkbox clip-check check-danger check-md');
                }
                $('.checkrep' + idQuestion).hide();
                $('#checkVerif' + idAnswer2).html('<i class="ti-close" ></i>');
            }
            return [valInputNoChecked, idAnswer2];
        }
        return [idQuestion, idAnswer2];
    });
    $('.btnValide').hide();
    $('.btnNextQues').show();
    var toQ = $('.CountQuestion').text();
    var questFinale = $('#tab'+idQuestion).data('index');
    if (questFinale == toQ) {
        $('#btnSaveQuiz').show();
    }
}
function CalculScoreQuiz() {
    $('div#bar').hide();
    $('.diapo2').hide();
    $('.diapo3').show();
    timeTest = $('#timeQuiz').text();
    var timeSave = timeQuiz - timeTest;
    idSessionCurrent = $('spam.nameSession').data('id');
    var nbrTotalQuestions = $('.CountQuestion').text();
    ArrayIdQ.forEach(function (idQues) {
        var nbrAnswerCorrectForQuestion = $('#countAnswerCorrect' + idQues).val();
        var nbAnswerCorrectChecked = $('div.correct.checked.answerCheckValid' + idQues).length;
        var TotalAnswerChecked = $('input[name="answer' + idQues + '"]:checked').length;
        if (nbAnswerCorrectChecked == TotalAnswerChecked && nbrAnswerCorrectForQuestion == nbAnswerCorrectChecked) {
            totalQuestionCorrect = nbQuestionCorrect++;
            statusQuestion = 1;
        } else {
            statusQuestion = 0;
        }
        statUserQuiz.push({idQues: idQues, status: statusQuestion});
    });
    scoreQuizUser = ((totalQuestionCorrect / nbrTotalQuestions) * 100).toFixed(0);
    saveQuiz(scoreQuizUser, timeSave, idSessionCurrent);
    statisticQuestion(statUserQuiz);
}
function saveQuiz(scoreQuiz, timeSave, idSessionCurrent) {
    var path = Routing.generate('admin_candidat_score_quiz_pressentiel_session_by_formation', {idSession: idSessionCurrent});
    $.ajax({
        type: 'POST',
        url: path,
        dataType: 'json',
        cache: false,
        data: {idSessionCurrent: idSessionCurrent, timeSave: timeSave, scoreQuiz: scoreQuiz},
        success: function (data) {
            scoreForFormation = parseInt($('.scoreFormation').val());
            if (scoreQuizUser >= scoreForFormation) {
                $('div.conclusion').text('Félicitations !');
                $('.nomC').show();
                $('.contenu').html( '<span>vous avez réussi le <span class="colortmp">'+data['nameSessionCurrent']+'</span> avec <span class="colortmp">'+ scoreQuizUser+'</span>% de bonnes réponses</span>');
                $('#downloadAttestation').show();

            } else {
                $('.contenu').html('<span> Nous avons le regret de vous annoncer que vous avez reçu <span class="colortmp">'+ scoreQuizUser+'</span>% de bonnes réponses, vous devez vous entraîner encore pour recevoir le diplôme du <span class="colortmp">'+data['nameSessionCurrent']+'</span></span>');
            }
        },
        error: function () {
        }
    });
}
function statisticQuestion(statUserQuiz) {
    var path = Routing.generate('admin_candidat_statistic_questions_pressentiel_session_by_formation');
    $.ajax({
        type: 'POST',
        url: path,
        dataType: 'json',
        cache: false,
        data: {statUserQuiz: statUserQuiz},
        success: function (data) {
        },
        error: function () {
        }
    });
}

