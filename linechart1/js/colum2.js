d3.csv("people.csv", type, function(data) {
    console.log(data);
    var width = 1000, //柱形图的宽度
        height = 500, //柱形图的高度
        margin = { left: 30, top: 30, right: 30, bottom: 30 }, //距离周边的距离,注意下面要计算坐标轴的位置
        svg_width = width + margin.left + margin.right, //将变量svg_height 改为 svg_width
        svg_height = height + margin.top + margin.bottom;

    // 定义缩放函数,y轴的缩放，y轴缩放不变，仍然是线性缩放
    var scale = d3.scale.linear()
        .domain([0, d3.max(data, function(d) {
            return d.price; //y坐标的值
        })])
        .range([height, 0]);

    //定义x轴的缩放，x轴缩放不是线性的，是随机的数值，使用Ordinal Scales方法实现。
    var scale_x = d3.scale.ordinal()
        // domain定义输入范围，rangeBands定义输出范围
        .domain(data.map(function(d) { //map可以将data数据映射成一个数组
            return d.id;
        }))
        .rangeBands([0, width], 0.1); //输出范围为：0-width，padding为：0.1。

    var svg = d3.select("#container")
        .append("svg")
        .attr("width", svg_width)
        .attr("height", svg_height);

    var chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = chart.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
            return "translate(" + scale_x(d.id) + ",0)";
        });

    bar.append("rect")
        .attr({
            "y": function(d) {
                return scale(d.price);
            },
            "width": scale_x.rangeBand(),
            "height": function(d) {
                return height - scale(d.price);
            }
        })
        .style("fill", "lightgreen")

    bar.append("text")
        .text(function(d) {
            return d.id;
        })
        .attr({ //设置数值的显示位置
            "y": function(d) {
                return scale(d.price);
            },
            "x": scale_x.rangeBand() / 2,
            "dy": 15,
            "text-anchor": "middle" //让字显示在条的内部
        })
})

function type(d) { //定义数据转换函数，将数据d传递进来
    // 将字符串类型的值转换为 number数值类型,用  = +
    d.price = +d.price;
    d.id = +d.id;
    return d;
}

// var x_axis = d3.svg.axis().scale(scale_x),
//     y_axis = d3.svg.axis().scale(scale).orient("left");

// // 定义坐标轴
// chart.append("g")
//     .call(x_axis);
//     .attr("transform","translate("++")")
// chart.append("g")
//     .call(y_axis);