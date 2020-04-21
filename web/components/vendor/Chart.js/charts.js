var Charts = function() {"use strict";

	var doughnutChartHandler = function() {
		var data = [{
			value: 10,
			color: '#F7464A',
			highlight: '#FF5A5E',
			label: 'Echec '
		}, {
			value: 90,
			color: '#4BB543',
			highlight: '#4BB543',
			label: 'Réussite'
		}
		];

		// Chart.js Options
		var options = {

			// Sets the chart to be responsive
			responsive: false,

			//Boolean - Whether we should show a stroke on each segment
			segmentShowStroke: true,

			//String - The colour of each segment stroke
			segmentStrokeColor: '#fff',

			//Number - The width of each segment stroke
			segmentStrokeWidth: 2,

			//Number - The percentage of the chart that we cut out of the middle
			percentageInnerCutout: 50, // This is 0 for Pie charts

			//Number - Amount of animation steps
			animationSteps: 100,

			//String - Animation easing effect
			animationEasing: 'easeOutBounce',

			//Boolean - Whether we animate the rotation of the Doughnut
			animateRotate: true,

			//Boolean - Whether we animate scaling the Doughnut from the centre
			animateScale: false,

			//String - A legend template
			legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

		};

		// Get context with jQuery - using jQuery's .get() method.
		var ctx = $("#doughnutChart").get(0).getContext("2d");
		// This will get the first returned node in the jQuery collection.
		var doughnutChart = new Chart(ctx).Doughnut(data, options);
		;
		//generate the legend
		var legend = doughnutChart.generateLegend();
		//and append it to your page somewhere
		$('#doughnutLegend').append(legend);
	};

	return {
		//main function to initiate template pages
		init: function() {
			doughnutChartHandler();
		}
	};
}();
