'use strict';
var Index = function() {
    CKEDITOR.env.isCompatible = true;

    var chart1Handler = function() {
        var path = Routing.generate('number_formation');
        $.ajax({
            type: 'POST',
            url: path,
            dataType: 'json',
            cache: false,
            success: function (res) {
                var data = res;
                var options = {

                    // Sets the chart to be responsive
                    responsive: true,

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
                    legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',


                };
                // Get context with jQuery - using jQuery's .get() method.
                var ctx = $("#chart1").get(0).getContext("2d");
                // This will get the first returned node in the jQuery collection.
                var chart1 = new Chart(ctx).Doughnut(data, options);
                //generate the legend
                var legend = chart1.generateLegend();
                //and append it to your page somewhere
                $('#chart1Legend').append(legend);
            }
        });
    };
    var chart2Handler = function() {
        var path = Routing.generate('number_total_employees_forme');
        $.ajax({
            type: 'POST',
            url: path,
            dataType: 'json',
            cache: false,
            success: function (res) {
                var data = res[0];
                var options = {

                    // Sets the chart to be responsive
                    responsive: true,

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
                    legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

                };
                // Get context with jQuery - using jQuery's .get() method.
                var ctx = $("#chart2").get(0).getContext("2d");
                // This will get the first returned node in the jQuery collection.
                var chart2 = new Chart(ctx).Doughnut(data, options);
                //generate the legend
                var legend = chart2.generateLegend();
                //and append it to your page somewhere
                $('#chart2Legend').append(legend);
            }
        });


    };

    return {
        init: function() {
            chart1Handler();
            chart2Handler();}
    };
}();