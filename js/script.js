// define the margins
var margin = {top: 20, right: 20, bottom: 30, left: 40},
// define the width
    width = 600 - margin.left - margin.right,
// define the height 
    height = 500 - margin.top - margin.bottom;

// define the x-axis ordinal scale range
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

// define the y-axis linear scale range
var y = d3.scale.linear()
    .range([height, 0]);

// defines the x-axis as a d3.svg.axis method call
var xAxis = d3.svg.axis()
// includes setting the scale
    .scale(x)
// and the orientation of the labels (below the axis)
    .orient("bottom");

// defines the y-axis as another d3.svg.axis method call
var yAxis = d3.svg.axis()
// includes the scale
    .scale(y)
// and the orientation of the labels (left of the axis)
    .orient("left")
// and how many tick marks
// not sure what the 'Hits' string does here. if I change it, I don't notice any difference either in the page's display or markup
    .ticks(20, "Hits");

// defines the svg that is our chart
// first select the HTML element (the one with the 'chart' class) to which we append the svg
var svg = d3.select(".chart").append("svg")
// set the width attribute of the appended svg
    .attr("width", width + margin.left + margin.right)
// set the height attribute of the appended svg
    .attr("height", height + margin.top + margin.bottom)
// appends a shape group that...appears to be a container for every other shape in the svg...but it's a little fuzzy to me.
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// calling d3's json method, the first argument is our data in the json file, the second is an anonymous function 
d3.json("js/baseballcard.json", function(error, data) {
// log the data to the console, in case we want to see what it looks like
	console.log(data);

// map the year property of the objects in the stats array in our data to the x domain
  x.domain(data.stats.map(function(d) { return d.year; }));
// map the hits property of the objects in the stats array in our data to the y domain  
  y.domain([0, d3.max(data.stats, function(d) { return d.H; })]);

// append a shape group to contain all the x-axis shapes
  svg.append("g")
// set the class for this element
      .attr("class", "x axis")
// sets where the labels appear, using the height variable to determine the distance from the top
      .attr("transform", "translate(0," + height + ")")
// call the xAxis method defined above
      .call(xAxis);

// append a shape group to contain all the y-axis shapes
  svg.append("g")
// set the class for this element
      .attr("class", "y axis")
// call the yAxis method defined above
      .call(yAxis)
// append text to the y-axis, which will be the label for the entire axis
    .append("text")
// which we want to be vertical, so rotate it counter-clockwise 90 degress
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
// sets the text of the y-axis label
      .text("Hits");

// select all of the shapes in the svg with the bar class...wait, when did those get added?
  svg.selectAll(".bar")
// call the data method with the stats array from our data...not sure why
      .data(data.stats)
// appending rectangle shapes after "entering" the svg
    .enter().append("rect")
// oh, so this is where we add the bar class to those rectangle shapes
      .attr("class", "bar")
// set where the bar appears on the x-axis, call an anonymous function, which just returns the year, to set the x attribute
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
// set how tall the bar is, call an anonymous function, which just returns the number of hits, to set the y attribute
      .attr("y", function(d) { return y(d.H); })
      .attr("height", function(d) { return height - y(d.H); });
});




