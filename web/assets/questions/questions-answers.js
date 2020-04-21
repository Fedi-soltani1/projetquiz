// this variable is the list in the dom, it's initiliazed when the document is ready
var $collectionHolder;
// the link which we click on to add new items
var $addNewItem = $('<div class="col-md-12"><a href="#" class="btn btn-primary pull-right"> Ajouter réponse <i class="fa fa-plus"></i></a></div>');
// when the page is loaded and ready
$(document).ready(function () {
    // get the collectionHolder, initilize the var by getting the list;
    $collectionHolder = $('#answers');
    // append the add new item link to the collectionHolder
    $collectionHolder.append($addNewItem);
    $collectionHolder.data('index', $collectionHolder.find('.panel').length);

    $collectionHolder.find('.panel').each(function () {
        addRemoveButton($(this));
    });

    // handle the click event for addNewItem
    $addNewItem.click(function (e) {
        // preventDefault() is your  homework if you don't know what it is
        // also look up preventPropagation both are usefull
        e.preventDefault();
        // create a new form and append it to the collectionHolder
        // and by form we mean a new panel which contains the form
        addNewForm();
    })
});
/*
 * creates a new form and appends it to the collectionHolder
 */
function addNewForm() {
    // getting the prototype
    // the prototype is the form itself, plain html
    var prototype = $collectionHolder.data('prototype');
    // get the index
    // this is the index we set when the document was ready, look above for more info
    var index = $collectionHolder.data('index');
    // create the form
    var newForm = prototype;
    // replace the __name__ string in the html using a regular expression with the index value
    newForm = newForm.replace(/__name__/g, index);
    // incrementing the index data and setting it again to the collectionHolder
    $collectionHolder.data('index', index+1);

    // create the panel
    // this is the panel that will be appending to the collectionHolder
    var $panel = $('<div class="panel"></div>');

    // create the panel-body and append the form to it
    var $panelBody = $('<div class="panel-body"></div>').append(newForm);

    $panel.append($panelBody);
    addRemoveButton($panel);
    $addNewItem.before($panel);

    formStyle(index);


}
function formStyle(index) {
    for (var i = 0; i <= index; i++) {
        $("#question_answers_"+index).find("#question_answers_"+index+"_label").addClass('form-control');
        $("#question_answers_"+index).find("#question_answers_"+index+"_flag").addClass('js-example-basic-single js-states form-control select_width');
        $("#question_answers_"+index+" > div:first").addClass('col-md-10');
        $("#question_answers_"+index+" > div:last").addClass('col-md-2');
    }
}

/**
 * adds a remove button to the panel that is passed in the parameter
 * @param $panel
 */
function addRemoveButton ($panel) {

    // create remove button
    var $removeButton = $('<div class="col-md-2"><a href="#"  class="btn btn-primary pull-left btn_trash"><i class="fa fa-trash"></i></a></div>');
    $removeButton.click(function (e) {
        e.preventDefault();
        $(e.target).parents('.panel').slideUp(1000, function () {
            $(this).remove();
        })
    });
    $panel.append($removeButton);

}

