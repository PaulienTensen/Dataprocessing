/*
Name: Paulien Tensen
Studentnumber: 10811559
Course: Dataprocessing
Week: 3

This program creates a barchart using d3 and the d3 tiptool.
*/

// Set margins, margins are specified as objects:
var margin = {
    top: 40,
    right: 70,
    bottom: 95,
    left: 40
  };
  
// Set svg size:
width = 900 - margin.left - margin.right,
height = 700 - margin.top - margin.bottom;
	
// Set the ranges:
var x = d3.scale.ordinal().rangeRoundBands([0, width], .01);
var y = d3.scale.linear().range([height, 0]);

// Define the x-axis:
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

// Define the y-axis:
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(20);

// Add tool tip attribute, show Rainfall: d.neerslag:
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 10])
  .html(function(d) {
    return "Rainfall: " + d.neerslag + " ml" + "</span>";
  })

// Add the SVG element:
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Invoke the tip in the context of the barchart:
svg.call(tip);

// Load the data: 
d3.json("file.json", function(error, data) {

	// Function to change d.neerslag string to numeric:
	data.forEach(function(d) {
		d.date = d.date;
		d.neerslag = +d.neerslag;
    });
	
  // Scale the range of the data:
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.neerslag; })]);
  
   // Add y- axis any
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
	  .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Rainfal (ml)");
	  
  svg.append("g")
	.append("text")
	.attr("transform", "rotate(0)")
	.attr("y", 110)
	.attr("dy", "30em")
	.style("text-anchor", "end")
	.text("Month");
  
  
  // Add x-axis:
  svg.append("g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
	.selectAll("text")
	  .style("text-anchor", "end")
	  .attr("dy", "-.88em")
	  .attr("dx", "-.9em")
	  .attr("transform", "rotate(-60)" );

  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.neerslag); })
      .attr("height", function(d) { return height - y(d.neerslag); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
});



