/*
Name: Paulien Tensen
Studentnumber: 10811559
Course: Dataprocessing
Week: 4

This program creates a scatterplot using d3. 
*/

// Set margins, margins are specified as objects:
var margin = {
    top: 20,
    right: 20,
    bottom: 200,
    left: 40
  };
  
// Set svg size:
var width = 1200 - margin.left - margin.right;
var height = 1000 - margin.top - margin.bottom;

// Set the ranges of the xaxis and yaxis:
var x = d3.scale.ordinal().rangeRoundBands([0, width]);
var y = d3.scale.linear().range([height, 0]);    
    
// Make variable colour:
var color = d3.scale.category10()

// Define xaxis:
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Define yaxis:
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Append svg: 
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
// Add svg:
var svgContainer = d3.select("body").append("svg")
    .attr("width",200)
    .attr("height",200);
                                      
// Open file json:   
d3.json("file.json", function(error, data) {
   
   // Set MortalityRate and Deaths to numeric:
	data.forEach(function(d) {
        d.Region = d.Region;
		d.MortalityRate = +d.MortalityRate;
        d.Deaths = +d.Deaths;
    });
    
    // Set domain, and use data.map to set xaxis:
    x.domain(data.map(function(d) { return d.Region; }));
    y.domain(d3.extent(data, function(d) { return d.MortalityRate; })).nice();

    // Call xAsis, add text on axis:
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dy", "-3em")
        .attr("dx", "-2.5em")
        .attr("transform", "rotate(-60)" );
       
    // Use text to define xAxis:
    svg.append("g")
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("x", 1000)
        .attr("dy", "900")
        .style("text-anchor", "end")
        .text("Region(World Wide)");
        
     // Use text to define title above legend:
    svg.append("g")
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("x", 1050)
        .attr("dy", "0")
        .style("text-anchor", "end")
        .text("Number of drug-related deaths:");

    // Use text to define the yAxis:
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
       .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("MortalityRate per million (age: 15-64) ")
       
    // Selec dot to make dots on the scatterplot, set radius on 10:   
    svg.selectAll(".dot")
        .data(data)
       .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx", function(d) { return x(d.Region); })
        .attr("cy", function(d) { return y(d.MortalityRate); })
        .style("fill", function(d) { return color(d.Deaths); });  
      
    // Select .legend to set colours to death-rate:
    var legend = svg.selectAll(".legend")
        .data(color.domain())
       .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });      

    // Make rectangles to define the colours in:     
    legend.append("rect")
        .attr("x", 1000 - 40)
        .attr("y", 15) 
        .attr("width", 40)
        .attr("height", 18)
        .style("fill", color)
      
    // Add text to legend, to define the colours:
    legend.append("text")
        .attr("x", width - 80)
        .attr("y", 25)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; })
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 50)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("MortalityRate)"); 
});
    
    
    
    
    
    
        
