// bron:https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad

// Set margins, margins are specified as objects:
var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  };
  
// Set svg size:
var width = 1000 - margin.left - margin.right;
var height = 540 - margin.top - margin.bottom;

// Scale x0: 
var x0 = d3.scale.ordinal().rangeRoundBands([0, width], .1);

// Scale x1:
var x1 = d3.scale.ordinal();

// Scale y:
var y = d3.scale.linear().range([height, 0]);

// Set X-Axis:
var xAxis = d3.svg.axis()
    .scale(x0)
    .tickSize(0)
    .orient("bottom");

// Set Y-Axis:
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Choose colours:
var color = d3.scale.ordinal()
    .range(["#78281F","#CB4335","#EC7063","#F5B7B1","#FADBD8"]);

var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
  
var svg = d3.select('body').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var q = d3.queue()
    .defer(d3.json, 'dataset.json') // topojson polygons
    .defer(d3.json, 'rate.json') // geojson points
    .await(visualize); // function that uses files    
 
function visualize(error, data, rate) {
  var catNames = data.map(function(d) { return d.categorie; });
  var ratNames = data[0].values.map(function(d) { return d.rate; });

  x0.domain(catNames);
  x1.domain(ratNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(categorie) { 
    return d3.max(categorie.values, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0')
      .call(yAxis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Death rate");

  svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

  var slice = svg.selectAll(".slice")
      .data(data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

  slice.selectAll("rect")
      .data(function(d) { return d.values; })
  .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.rate); })
      .style("fill", function(d) { return color(d.rate) })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })
      .on("mouseover", function(d) {
          d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.rate));
      });

  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
      
  //Add legend:
  var legend = svg.selectAll(".legend")
      .data(data[0].values.map(function(d) { return d.rate; }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","0");
    
  // Append legend:  
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 33)
      .attr("height", 22)
      .style("fill", function(d) { return color(d); });

  // Append text to legend:    
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 11)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });

  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1"); 
}
    
// Invoke the tip in the context of the barchart:
//svg.call(tip);  
    
//d3.json("dataset.json", function(error, data) {

  

//});