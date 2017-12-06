// svg
d3.select("#container")
    .append("svg")
    // width,height
    .attr("width", 500)
    .attr("height", 200)

d3.select("svg")
    .append("g")
    .attr("transform", "translate(50,30)")

d3.select("g")
    .append("path")