var FormElements = function() {"use strict";


	var select2Handler = function() {
		$(".js-example-basic-single").select2();
		$(".js-example-basic-multiple").select2();
		$(".js-example-placeholder-single").select2({
			placeholder: "Opération"
		});
		var data = [{
			id: 0,
			text: 'enhancement'
		}, {
			id: 1,
			text: 'bug'
		}, {
			id: 2,
			text: 'duplicate'
		}, {
			id: 3,
			text: 'invalid'
		}, {
			id: 4,
			text: 'wontfix'
		}];
		$(".js-example-data-array-selected").select2({
			data: data
		});
		$(".js-example-basic-hide-search").select2({
			minimumResultsForSearch: Infinity
		});
	};

	return {
		//main function to initiate template pages
		init: function() {

			select2Handler();

		}
	};
}();
