$(document).ready(function () {
    var $collectionHolders;
    var $addTagButtons = $('<button type="button" class="add_tag_link btn btn-Add_Media">Ajouter  Media  <i class="fa fa-plus"></i> </button>');
    var $newLinkLis = $('<div class=""></div>').append($addTagButtons);

    $collectionHolders = $('div.media');

    $collectionHolders.find('.media').each(function () {
        addTagFormDeleteLinks($(this));
    });

    $collectionHolders.append($newLinkLis);


    $collectionHolders.data('index', $collectionHolders.find(':input').length);
    var index = $collectionHolders.data('index');

    formDesign(index);
    console.log(formDesign(index));
    $addTagButtons.on('click', function (e) {
        // add a new tag form (see next code block)
        addTagForms($collectionHolders, $newLinkLis);
        var i = 0;
        $('input[type=number]').each(function () {
            i++;
            $(this).val(i);
        })
    });
    $('.delete-btn-edit').click(function (e) {
        $(e.target).parents('.media-item').slideUp(1000, function () {
            $(this).remove();
            var i = 0;
            $('input[type=number]').each(function () {
                i++;
                $(this).val(i);
            })
        });
    });

    function addTagForms($collectionHolders, $newLinkLis) {
        // Get the data-prototype explained earlier
        var prototypes = $collectionHolders.data('prototype');

        // get the new index
        var index = $collectionHolders.data('index');
        var newForms = prototypes;

        newForms = newForms.replace(/__name__/g, index);

        $collectionHolders.data('index', index + 1);
        var $newFormLis = $('<div class="row media-item col-md-12" style="margin-top: 20px;"></div>').append(newForms);
        $newLinkLis.before($newFormLis);

        addTagFormDeleteLinks($newFormLis, index);
        formDesign(index);
    }
    function addTagFormDeleteLinks($tagFormLi, index) {
        var $removeFormButton = $('<div class="col-md-2"><button type="button" class="btn btn-danger delete-btn"><i class="fa fa-trash"></i> </button></div>');
        $tagFormLi.append($removeFormButton);

        $removeFormButton.on('click', function (e) {
            // remove the li for the tag form
            $(e.target).parents('.media-item').slideUp(1000, function () {
                $tagFormLi.remove();
                var i = 0;
                $('input[type=number]').each(function () {
                    i++;
                    $(this).val(i);
                })
            });
        });
    }

    function formDesign(index) {
        for (var i = 0; i <= index; i++) {
            $('#elearning_session_elearningSessionMedias_' + i).addClass('col-md-10 row ');
            $('#elearning_session_elearningSessionMedias_' + i + ' div:nth-child(1)').addClass(' col-md-2');
            $('#elearning_session_elearningSessionMedias_' + i + ' div:nth-child(2)').addClass('col-md-7');
            $('#elearning_session_elearningSessionMedias_' + i + '_medias').removeClass('').addClass('js-example-basic-single js-states form-control selectpicker');
            $('#elearning_session_elearningSessionMedias_' + i + 'ordre').addClass('form-control input-sm inputOrder');
            $('#elearning_session_elearningSessionMedias_' + i + 'ordre').val(i);
            $('#elearning_session_elearningSessionMedias_' + i + '_name');
            $('#elearning_session_elearningSessionMedias_' + i + '_medias').select2({
                placeholder: "Selectionnez Media"
            });

        }
    }

    //select formation selon le category selected

    var valSelecteCategorty = $('#elearning_session_category').val();

    if (valSelecteCategorty == '') {
        $('#elearning_session_formation').empty();

    }

    $('#elearning_session_category').change(function () {

        var valCategory = $(this).val();
        var path = Routing.generate('formationEle_by_categorie', { idCat: valCategory });

        $.ajax({
            type: 'POST',
            url: path,
            dataType: 'json',
            cache: false,
            data: {valCategory: valCategory},
            success: function (data) {
                $('#elearning_session_formation').empty();

                var rows = '';
                rows = rows + '<option value="0">Selectionnez formation</option>';

                $.each(data['formation'], function (key, value) {
                    rows = rows + '<option value="' + value.id + '">' + value.name + '</option>';
                });
                $("#elearning_session_formation").html(rows);
                $("#elearning_session_formation").select2();
                $("#elearning_session_formation").select2({
                    placeholder: "Selectionnez formation"
                });

            },
            error: function () {
            }
        });


    });


});