var data = [1, 4, 2, 5, 22, 9, 11],
    bar_height = 50,
    bar_padding = 10,
    svg_height = (bar_height + bar_padding) * data.length,
    svg_width = 500

// 定义缩放函数
var scale = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, svg_width]);
var svg = d3.select("#container")
    .append("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)

var bar = svg.selectAll("g") //旋转svg中所有的g元素
    .data(data) //使用data()方法将data[]数组和g绑定起来
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
        return "translate(0," + i * (bar_height + bar_padding) + ")";
    })
bar.append("rect")
    .attr({
        "width": function(d) {
            return scale(d);
        },
        "height": bar_height
    })
    .style("fill", "lightgreen")

bar.append("text")
    .text(function(d) {
        return d;
    })
    .attr({ //设置数值的显示位置
        "x": function(d) {
            return scale(d);
        },
        "y": bar_height / 2,
        "text-anchor": "end" //让字显示在条的内部
    })