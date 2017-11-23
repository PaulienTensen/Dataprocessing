/*
Name: Paulien Tensen
Studentnumber: 10811559
Course: Dataprocessing
Week: 4

This program makes a legend.
*/

d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;    
    document.body.appendChild(xml.documentElement);    
    
    // Add rect and change the color:
    d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 138.7).style("fill", "#41ae76").style("stroke", "black")
    d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 180.7).style("fill", "#238b45").style("stroke", "black")  
    d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 220.7).style("fill", "#005824").style("stroke", "black")  
    d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 257.7).style("fill", "grey").style("stroke", "black")
   
    // Add rect:
    var rect3 = d3.select("svg").append("rect").attr("height", 29).attr("width", 119.1).attr("x", 46.5).attr("y", 180.7).style("fill", "none").style("stroke", "black")
    var rect2 = d3.select("svg").append("rect").attr("height", 29).attr("width", 119.1).attr("x", 46.5).attr("y", 220.7).style("fill", "none").style("stroke", "black")
    var rect2 = d3.select("svg").append("rect").attr("height", 29).attr("width", 119.1).attr("x", 46.5).attr("y", 220.7).style("fill", "none").style("stroke", "black")
    var rect4 = d3.select("svg").append("rect").attr("height", 29).attr("width", 119.1).attr("x", 46.5).attr("y", 257.7).style("fill", "none").style("stroke", "black")
  
    // Make text blocks:
    d3.select("svg").append("text").attr("x", parseFloat(rect3.attr("x")) +5).attr("y", parseFloat(rect3.attr("y")) -22).text("100000")
    d3.select("svg").append("text").attr("x", parseFloat(rect3.attr("x")) +5).attr("y", parseFloat(rect3.attr("y")) -64).text("10000")
    d3.select("svg").append("text").attr("x", parseFloat(rect3.attr("x")) +5).attr("y", parseFloat(rect3.attr("y") -104)).text("1000") 
    d3.select("svg").append("text").attr("x", parseFloat(rect3.attr("x")) +5).attr("y", parseFloat(rect3.attr("y")) -147).text("100")
       
    // Select other colours:
    d3.select("#kleur3").style("fill", "#66c2a4")
    d3.select("#kleur2").style("fill", "#99d8c9")
    d3.select("#kleur1").style("fill", "#ccece6")   
       
    // Add text:
    d3.select("svg").append("text").attr("x", parseFloat(rect2.attr("x")) +5).attr("y", parseFloat(rect2.attr("y") -20)).text("10000000")
    
    // Add unknown text box:
    d3.select("svg").append("text").attr("x", parseFloat(rect4.attr("x")) +5).attr("y", parseFloat(rect4.attr("y") -18)).text("100000000")
    d3.select("svg").append("text").attr("x", parseFloat(rect4.attr("x")) +5).attr("y", parseFloat(rect4.attr("y"))+ 20).text("Unknown")
   
    });