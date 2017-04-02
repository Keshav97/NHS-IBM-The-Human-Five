myapp.controller('th5Ctrl', ['$scope', '$state', '$stateParams', '$localStorage', 
  function ($scope, $state, $stateParams, $localStorage )
  {
    $(".notValid").hide();
    $("#p1").hide();
    $("#p2").hide();
    $("#p3").hide();
    $("#p4").hide();

    $(".question1-button").click(function()
    {
      console.log($(".question1-button").val());
    });

    $scope.selfRateList = ([{mind:0, movement: 0, nutrition: 0, world:0, body:0}, {mind:0, movement: 0, nutrition: 0, world:0, body:0},{mind:0, movement: 0, nutrition: 0, world:0, body:0},{mind:0, movement: 0, nutrition: 0, world:0, body:0},{mind:0, movement: 0, nutrition: 0, world:0, body:0}]);
    if($localStorage.rateList != null)
      $scope.selfRateList = $localStorage.rateList;

    $scope.addSelfRate= function () 
    {

      if( !$scope.firstValue && !$scope.secondValue && !$scope.thirdValue && !$scope.fourthValue && !$scope.fifthValue)
      {
        $(".notValid").show();
      }
      else
      {
        $scope.selfRateList.push
        ({
          mind:parseInt($scope.firstValue),
          movement:parseInt($scope.secondValue),
          nutrition:parseInt($scope.thirdValue),
          world:parseInt($scope.fourthValue),
          body:parseInt($scope.fifthValue)
        });

        $(".notValid").hide();
        $ionicViewService.nextViewOptions({
          disableBack: true
        });
        $state.go('menu.performance');
      }

      $localStorage.rateList = $scope.selfRateList;
    };

    $scope.goPerformancePage = function()
    {
      $state.go('menu.performance');
    }

    $scope.goWEMWBSPage = function()
    {
      $state.go('menu.wEMWBS');
    }



   // canvas


////////
/*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
nv.addGraph(function() {
  var chart = nv.models.lineChart()
                .margin({left: 20, top:20})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                //.transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(false)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
                ;

  chart.xAxis     //Chart x-axis settings
  .tickFormat(d3.format(',r'))
  .ticks(5)

  chart.yAxis     //Chart y-axis settings
      //.axisLabel('Voltage (v)')
      .tickFormat(d3.format('.02f'))
      .tickPadding(10);

      /* Done setting the chart up? Time to render it!*/
  var data = sinAndCos();   //You need data...

  var svg = d3.select('svg');    //Select the <svg> element you want to render the chart in.   

  svg.append("linearGradient")
  .attr("id", "temperature-gradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .selectAll("stop")
  .data([
    {offset: "0%", color: "steelblue"},
    {offset: "30%", color: "green"},
    {offset: "50%", color: "yellow"},
    {offset: "100%", color: "red"}
    ])
  .enter().append("stop")
  .attr("offset", function(d) { return d.offset; })
  .attr("stop-color", function(d) { return d.color; });

    svg.datum(data)         //Populate the <svg> element with chart data...
    .attr("class", "xAxis")
    .attr("class", "axisLabel")
    .attr("class", "bg")
       .call(chart);          //Finalldy, render the chart!

       var configTooltip = function(d) {

        chart.tooltip.hidden(false);

            // attr("style").innerHTML = 
            //   $(".nvtooltip").attr("style").replace("opacity: 0", "opacity:1")
            if($(".x-value")[0].innerHTML){
              var stressVal = Number($(".x-value")[0].innerHTML);
            }
            if (stressVal < 10) {
              var str = "inactive";
              var col = "steelblue";
            } else if (stressVal < 20) {
              var str = "laidback";
              var col = "green";
            } else if (stressVal < 30) {
              var str = "fatigue";
              var col = "lightgreen";
            } else if (stressVal < 40) {
              var str = "exhaustion";
              var col = "yellow";
            } else if (stressVal <50) {
              var str = "anxiety/panic/anger";
              var col = "orange";
            } else {
              var str = "breakdown";
              var col = "red";
            } 
            $(".key")[0].innerHTML = str;
            var legendBox = d3.select(".legend-color-guide div");
            
            legendBox.style("background-color", col);           
          };
// app
          // svg.on("touchmove", configTooltip);

          // svg.on("touchstart", configTooltip);

          // svg.on("touchover", configTooltip);

// Web
// svg.on("mouseover", configTooltip);
svg.on("mousemove", configTooltip);






  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});



/**************************************
 * Simple test data generator
 */
 function sinAndCos() {
  var sin = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 51; i++) {

    sin.push({x: i, y: Math.sin(i/16)});

  }

  //Line chart data should be sent as an array of series objects.
  return [

  {
    values: sin,
    key: 'Stress Level',
    color: 'temperature-gradient',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
    ];
  }



}])





