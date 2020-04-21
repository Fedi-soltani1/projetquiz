'use strict';
var Index = function() {
    CKEDITOR.env.isCompatible = true;
    var chart1Handler = function () {
        $('.collapse').on('show.bs.collapse', function () {
            var valIdSession = $(this).attr('id');
            var path = Routing.generate('evaluation_chart', {session: valIdSession});
            $.ajax({
                type: 'POST',
                url: path,
                dataType: 'json',
                cache: false,
                success: function (res) {
                    var data = {
                        labels: res['labels'],
                        datasets: [{
                            label:res['name'],
                            backgroundColor: "rgba(75,192,192,0.3)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: "butt",
                            fillColor: 'rgba(75,192,192,0.3)',
                            strokeColor: 'rgba(75,192,192,1)',
                            pointColor: 'rgb(220,92,88)',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(220,220,220,1)',
                            data: res['notes'],
                        }]
                    };

                    // Chart.js Options
                    var options = {

                        // Sets the chart to be responsive
                        responsive: true,

                        //Boolean - Whether to show lines for each scale point
                        scaleShowLine: true,

                        //Boolean - Whether we show the angle lines out of the radar
                        angleShowLineOut: true,

                        //Boolean - Whether to show labels on the scale
                        scaleShowLabels: false,

                        // Boolean - Whether the scale should begin at zero
                        scaleBeginAtZero: true,

                        //String - Colour of the angle line
                        angleLineColor: 'rgba(0,0,0,.1)',

                        //Number - Pixel width of the angle line
                        angleLineWidth: 1,

                        //String - Point label font declaration
                        pointLabelFontFamily: '"Arial"',

                        //String - Point label font weight
                        pointLabelFontStyle: 'normal',

                        //Number - Point label font size in pixels
                        pointLabelFontSize: 10,

                        //String - Point label font colour
                        pointLabelFontColor: '#666',

                        //Boolean - Whether to show a dot for each point
                        pointDot: true,

                        //Number - Radius of each point dot in pixels
                        pointDotRadius: 3,

                        //Number - Pixel width of point dot stroke
                        pointDotStrokeWidth: 1,

                        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                        pointHitDetectionRadius: 20,

                        //Boolean - Whether to show a stroke for datasets
                        datasetStroke: true,

                        //Number - Pixel width of dataset stroke
                        datasetStrokeWidth: 2,

                        //Boolean - Whether to fill the dataset with a colour
                        datasetFill: true,

                        //String - A legend template
                        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
                    };
                    // Get context with jQuery - using jQuery's .get() method.
                    var ctx = $("#chart"+ valIdSession).get(0).getContext("2d");
                    // This will get the first returned node in the jQuery collection.
                    var chart4 = new Chart(ctx).Radar(data, options);
                    //generate the legend
                    var legend = chart4.generateLegend();
                    //and append it to your page somewhere
                    $('#chart'+valIdSession+'Legend').append(legend);
                }
            });
        });
    };
    var chart3Handler = function() {
        var path = Routing.generate('evaluationChartTotal');
        var data  = [];
        $.ajax({
            type: 'POST',
            url: path,
            dataType: 'json',
            cache: false,
            success: function (res) {
                res.forEach(myFunction);
                function myFunction(item) {
                    data.push({
                        value: item['total_votes'],
                        color: item['backgroundColor'],
                        highlight: item['borderColor'],
                        label: item['name'] +' ('+ item['nbr_votes']+')'
                    });
                }

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
                    legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

                };
                // Get context with jQuery - using jQuery's .get() method.
                var ctx = $("#chart3").get(0).getContext("2d");
                // This will get the first returned node in the jQuery collection.
                var chart3 = new Chart(ctx).Doughnut(data, options);
                //generate the legend
                var legend = chart3.generateLegend();
                //and append it to your page somewhere
                $('#chart3Legend').append(legend);
            }
        });
    };
    return {
        init: function() {
            chart1Handler();
            chart3Handler();
        }
    };
}();