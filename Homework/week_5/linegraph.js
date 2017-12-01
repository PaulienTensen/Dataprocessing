/*
Paulien Tensen 
1081159
Course: Dataprocessing week 5

This program makes an line graph, displays the temperature in (0,1 degrees
Celcius)
Display data of year 2015 and 2016.

reference : https://bl.ocks.org/mbostock/3902569

*/

// Make some variables, selfexplanetory.
var margin = {
    top: 30,
    right: 80,
    bottom: 80,
    left: 50
  };

// Parse the Date and bisectDate:
var parseDate = d3.time.format("%d-%b-%y").parse,
    bisectDate = d3.bisector(function(d) { return d.Month; }).left;

// Set svg size:
var width = 1000 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;   
    
// Set the ranges of the xaxis and yaxis:
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]); 

// Define Xaxis:
var xAxis = d3.svg.axis().scale(x).orient("bottom");

// Define yaxis:
var yAxis = d3.svg.axis().scale(y).orient("left");

// Make variable valueline 1:
var	valueline = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.average2016); });
	
// Make variable valueline 2:
var	valueline2 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.Maximum2016); });

// Make variable valueline 3:    
var	valueline3 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.Minimum2016); });
    
// Make variable valueline 4:
var	valueline4 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.average2015); });

// Make variable valueline 5:    
var	valueline5 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.Maximum2015); });
   
// Make variable valueline 6:
var	valueline6 = d3.svg.line()
	.x(function(d) { return x(d.Month); })
	.y(function(d) { return y(d.Minimum2015); });
 
// Set tooltip:
var div = d3.select("body").append("div").attr("class", "tooltip")				
    .style("opacity", 0);       
 
// Append svg: 
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");     
   
// Set focus:
var focus = svg.append("g").style("display", "none");     

// Open json:   
d3.json("datasets.json", function(error, data) {
    if (error) throw error;    
    
    // Set max/min to number:
	data.forEach(function(d) {
        d.Month = parseDate(d.Month);
        d.average2015 = +d.average2015;
        d.average2016 = +d.average2016;
        d.Minimum2015 = +d.Minimum2015;
        d.Minimum2016 = +d.Minimum2016;
        d.Maximum2015 = +d.Maximum2015;
        d.Maximum2016 = +d.Maximum2016;  
    });
    
    // Set domain:
    y.domain([0, d3.max(data, function(d) { return Math.max(d.Minimum2016, 
    d.Maximum2016); })]);
    x.domain(d3.extent(data, function(d) { return d.Month; }));

    // These counters will track how often the dropdown button is clicked.
    var count2015 = 0;
    var count2016 = 0;

    // Enter this function when the dropdown menu is clicked.
    d3.selectAll(".dropdown-menu li a").on("click", function() {
        console.log(d3.select(this).text())
       
    // Add the valueline 1 path:
    svg.append("path")		
		.attr("class", "line1")
		.style("stroke", "black")
        .style("fill", "none")
		.attr("d", valueline(data));
        
    // Add the valueline 2 path:
    svg.append("path")	
		.attr("class", "line1")
		.style("stroke", "red")
        .style("fill", "none")
		.attr("d", valueline2(data));
        
    // Add the valueline 3 path:    
    svg.append("path")		
		.attr("class", "line1")
		.style("stroke", "blue")
        .style("fill", "none")
		.attr("d", valueline3(data));

  //   Add the valueline 4 path:
    svg.append("path")		
		.attr("class", "line2")
		.style("stroke", "black")
        .style("fill", "none")
		.attr("d", valueline4(data));
        
    // Add the valueline 5 path:
    svg.append("path")	
		.attr("class", "line2")
		.style("stroke", "red")
        .style("fill", "none")
		.attr("d", valueline5(data));
  
    // Add the valueline 6 path:  
    svg.append("path")		
		.attr("class", "line2")
		.style("stroke", "blue")
        .style("fill", "none")
		.attr("d", valueline6(data));    
        
    // Set a rectangle, capture the mouse:              
    svg.append("rect")                                     
        .attr("width", width)                             
        .attr("height", height)                         
        .style("fill", "none")                       
        .style("pointer-events", "all")  
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);         

    // Append a circle to first:             
    focus.append("circle")                                
        .attr("class", "y")  
        .attr("id","y")                              
        .style("fill", "none")             
        .style("stroke", "blue")             
        .attr("r", 4);   
    
    // Set value at the circle:
    focus.append("text")
        .attr("class", "y")
        .attr("id","y")
        .attr("dx", 8)
        .attr("dy", "-.3em");
        
    // Append a circle to second:               
    focus.append("circle")                             
        .attr("class", "x2")  
        .attr("id","x2")                        
        .style("fill", "none")              
        .style("stroke", "blue")  
        .attr("r", 4);            
    
    // Place the value at the circle:
    focus.append("text")
        .attr("class", "x2")
        .attr("id","x2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // Append a circle to third:              
    focus.append("circle")                                 
        .attr("class", "x1") 
        .attr("id","x1")                          
        .style("fill", "none")                          
        .style("stroke", "blue")                        
        .attr("r", 4);                 
    
    // Place the value in circle:
    focus.append("text")
        .attr("class", "x1")
        .attr("id","x1")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // Append a circle to fourth:               
    focus.append("circle")                                
        .attr("class", "xx")  
        .attr("id","xx")                              
        .style("fill", "none")                             
        .style("stroke", "blue")                      
        .attr("r", 4);          
    
    // Place value in circle:
    focus.append("text")
        .attr("class", "xx")
        .attr("id","xx")
        .attr("dx", 8)
        .attr("dy", "-.3em");
        
    // Append a circle to fifth:  
    focus.append("circle")                                 
        .attr("class", "xxxx")  
        .attr("id","xxxx")                              
        .style("fill", "none")                           
        .style("stroke", "blue")                     
        .attr("r", 4);       
    
    // Place value in circle:
    focus.append("text")
        .attr("class", "xxxx")
        .attr("id","xxxx")
        .attr("dx", 8)
        .attr("dy", "-.3em");
    
    // Append a circle to sixt: 
    focus.append("circle")     
        .attr("class", "yxyx")  
        .attr("id","yxyx")     
        .style("fill", "none")         
        .style("stroke", "blue")                    
        .attr("r", 4);                                    
    
    // Append text to circle:
    focus.append("text")
        .attr("class", "yxyx")
        .attr("id","yxyx")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // Set function mouseover:
    function mousemove() {                        
        var x0 = x.invert(d3.mouse(this)[0]),   
            i = bisectDate(data, x0, 1), 
            d0 = data[i - 1],           
            d1 = data[i],  
            d = x0 - d0.Month > d1.Month - x0 ? d1 : d0;

        // Select average2015:    
        focus.select("circle.y")
        .attr("transform", "translate(" + x(d.Month) + "," + y(d.average2016) 
            + ")")
        .style('fill', 'black');
        
        // Select Maximum2016: 
        focus.select("circle.x2")                           
            .attr("transform", "translate(" + x(d.Month) + "," + y(d.Maximum2016) 
                + ")")
            .style('fill', 'black');
 
        // Select Minimum2016:
        focus.select("circle.x1")                           
            .attr("transform", "translate(" + x(d.Month) + "," + y(d.Minimum2016) 
                + ")")
            .style('fill', 'black');

        // Select average2015:
        focus.select("circle.xx")                           
            .attr("transform", "translate(" + x(d.Month) + "," +  y(d.average2015)
                + ")")
            .style('fill', 'black');
   
        // Select Maximum2015:
        focus.select("circle.xxxx")
            .attr("transform", "translate(" + x(d.Month) + "," + y(d.Maximum2015) 
                + ")")
            .style('fill', 'black');
        
        // Select Minimum2015:
        focus.select("circle.yxyx")                           
            .attr("transform","translate(" + x(d.Month) + "," + y(d.Minimum2015) 
                + ")")
            .style('fill', 'black');

        // Select Minimum2015:
        focus.select("text.yxyx")
            .attr("transform", "translate(" + x(d.Month) + "," +y(d.Minimum2015)
                + ")")
            .text("Min Temp: " + d.Minimum2015 + '(0,1C)')
            .style("fill", 'black');  
            
        // Select the text of average2015:
        focus.select("text.y")
            .attr("transform","translate(" + x(d.Month)+ "," + y(d.average2016) 
                 + ")")
            .text("Average Temp: " + d.average2016 + '(0,1C)')
            .style("fill", 'black');
            
        // Add text to Maximum2016:
        focus.select("text.x2")
            .attr("transform","translate(" + x(d.Month) + "," + y(d.Maximum2016) 
                + ")")
            .text("Max Temp: " + d.Maximum2016 + '(0,1C)')
            .style("fill", 'black');
            
        // Add text to Minimum2016:    
        focus.select("text.x1")
            .attr("transform","translate(" + x(d.Month) + "," + y(d.Minimum2016) 
                + ")")
            .text("Min Temp: " + d.Minimum2016 + '(0,1C)')
            .style("fill", 'black');
            
        // Add text to average2015:
        focus.select("text.xx")
            .attr("transform","translate(" + x(d.Month) + "," + y(d.average2015)
                + ")")
            .text("Average temp: " + d.average2015 + '(0,1C)')
            .style("fill", 'black');
        
        // Add text to Maximum2015:
        focus.select("text.xxxx").attr("transform", "translate(" + x(d.Month) 
            + "," + y(d.Maximum2015) + ")")
            .text("Max temp: " + d.Maximum2015 + '(0,1C)')
            .style("fill", 'black');
    }; 

    // When you click on the button 2016:
    if (d3.select(this).text() == 2016) 
        {
            count2016 = count2016 + 1;
            count2015 = 0;
            d3.selectAll("#x1").remove();
            d3.selectAll("#x2").remove();
            d3.selectAll("#y").remove();
            d3.selectAll(".line1").remove();
               
            if (count2016 % 2 == 0)
                { 
                    d3.selectAll(".line2").remove();
                    d3.selectAll("#xx").remove();
                    d3.selectAll("#xxxx").remove();
                    d3.selectAll("#yxyx").remove();
                }
        }

    // When you click on the button 2015:
    if (d3.select(this).text() == 2015) 
        {   
            count2015 = count2015 + 1;
            count2016 = 0;
            d3.selectAll("#yxyx").remove();
            d3.selectAll("#xxxx").remove();
            d3.selectAll("#xx").remove();
            d3.selectAll(".line2").remove();
      
    if (count2015 % 2 == 0)
                {
                    d3.selectAll("#y").remove();
                    d3.selectAll("#x2").remove();
                    d3.selectAll("#x1").remove();
                    d3.selectAll(".line1").remove();
                }    
        }
     })   
   
  // Set X-Axis, append text:
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("dx", "-2.5em")
        .attr("transform", "rotate(-60)" );   
        
    // Sppend text of Y-Axis:
    svg.append("g")
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("y", 60)
        .attr("x", 850)
        .attr("dy", "30em")
        .style("text-anchor", "end")
        .text("Month");
        
     // Select y-Axis, append the name of Yaxis:
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
       .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Degrees Celcius (0,1)")
});

// Dropdown menu Jquery:
$('.dropdown-toggle').dropdown();