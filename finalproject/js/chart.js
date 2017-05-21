function start(){
   

    $.ajax({
     url: "php/get_list.php",
     type: "POST",
     datatype: "html",
          success: function( output ) {
            //alert(output);
            $( "#list" ).html(output);
            refresh_chart();  //第一次load更新圖表
          },
     error : function(){
         alert( "Request failed." );
   }
    });

}
function refresh_chart(){
  var target = $("#list").val();
  //alert(target);

    $.ajax({
   url: "php/connect_mysql.php",
   type: "POST",
    data :{
        target:target
    },
   datatype: "html",
        success: function( output ) {
          //alert(output);
          //$( "#out" ).html(output);
          
          $("#chart").html(""); //clear上個chart
          chart(output);
        },
   error : function(){
       alert( "Request failed." );
   }
    });

}
function chart(output) {
/*
window.alert( output );

var data = JSON.parse(output);
window.alert( data.toString() );
*/
var data = JSON.parse(output);
//window.alert( JSON.stringify(data) );

var margin = {top: 20, right: 240, bottom: 240, left: 40},
    width = 1240 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, 1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickPadding(5)
    //.ticks(29)
/*
    .innerTickSize(-height)
    .outerTickSize(0)
*/
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    //.orient("right");
//.tickValues(d3.range(0, 5, 1))
.tickSize(-width,0)

    .tickPadding(10)

    .orient("left");
    //.tickFormat(formatPercent);

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/*
var data = [
  {產業別: "A", 成交金額: .00007},
  {產業別: "B", 成交金額: .01492},
  {產業別: "C", 成交金額: .02780},
  {產業別: "D", 成交金額: .04253},
  {產業別: "E", 成交金額: .12702},
  {產業別: "F", 成交金額: .02288},
  {產業別: "G", 成交金額: .02022},
  {產業別: "H", 成交金額: .06094},
  {產業別: "I", 成交金額: .06973},
  {產業別: "J", 成交金額: .00153},
  {產業別: "K", 成交金額: .00747},
  {產業別: "L", 成交金額: .04025},
  {產業別: "M", 成交金額: .02517},
  {產業別: "N", 成交金額: .06749},
  {產業別: "O", 成交金額: .07507},
  {產業別: "P", 成交金額: .01929},
  {產業別: "Q", 成交金額: .00098},
  {產業別: "R", 成交金額: .05987},
  {產業別: "S", 成交金額: .06333},
  {產業別: "T", 成交金額: .09056},
  {產業別: "U", 成交金額: .02758},
  {產業別: "V", 成交金額: .01037},
  {產業別: "W", 成交金額: .02465},
  {產業別: "X", 成交金額: .00150},
  {產業別: "Y", 成交金額: .01971},
  {產業別: "Z", 成交金額: .00074}
];
window.alert( JSON.stringify(data) );
*/
//d3.tsv("data.tsv", function(error, data) {

  data.forEach(function(d) {
    d.成交金額 = +d.成交金額;
  });

  x.domain(data.map(function(d) { return d.產業別; }));
  y.domain([0, d3.max(data, function(d) { return d.成交金額; })]);

  var gx = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    gx.selectAll("text")
      .style("text-anchor", "start")
      .on('click', function() {chart2(this.textContent );});
      ;
/*
      .selectAll("text")
      .style("text-anchor", "start")
      .attr("transform", "rotate(" + 90 + ")");
*/

  var gy = svg.append("g")
      .attr("class", "y axis")
      //.style("position", "fixed")
      .call(yAxis);
    gy.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("成交金額");

    gy.selectAll("g")
      .classed("minor", true);

    gy.append("text")
        .attr("transform", "translate(0," + height + ")")
        .attr("y", 20)
        .style("text-anchor", "middle")
        .text("(單位:億)");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.產業別); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.成交金額); })
      .attr("height", function(d) { return height - y(d.成交金額); })
            ;

  d3.select("input").on("change", change);
/*
  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 2000);
*/
  function change() {
    //clearTimeout(sortTimeout);

    // Copy-on-write since tweens are evaluated after a delay.
    var x0 = x.domain(data.sort(this.checked
        ? function(a, b) { return b.成交金額 - a.成交金額; }
        : function(a, b) { return d3.ascending(a.產業別, b.產業別); })
        .map(function(d) { return d.產業別; }))
        .copy();

    svg.selectAll(".bar")
        .sort(function(a, b) { return x0(a.產業別) - x0(b.產業別); });

    var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 50; };

    transition.select(".x.axis").selectAll("text")
      .style("text-anchor", "start");

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d.產業別); });


    transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
      .delay(delay);

;
  }
//});







}
