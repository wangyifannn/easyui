var width = 500,
    height = 200,
    margin = { left: 50, top: 30, right: 20, bottom: 20 },
    g_width = width - margin.left - margin.right,
    g_height = height - margin.top - margin.bottom;

// svg
var svg = d3.select("#container")
    .append("svg")
    // width,height
    .attr("width", width) //attribute
    .attr("height", height)

// 再添加一个g元素，发现当有两个g的时候，select选择的是第一个符合条件的元素g,
// selectAll选中的是页面中所有的元素
d3.select("svg").append("g")
var g = d3.select("svg")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
var data = [2, 12, 3, 4, 5, 6, 22]

// 将g成比例缩放
var scale_x = d3.scale.linear() //使用d3中的scale函数进行缩放，因为是线性的所以使用linear
    .domain([0, data.length - 1]) //domain定义输入范围
    .range([0, g_width]) //range（）定义输出范围

var scale_y = d3.scale.linear()
    .domain([0, d3.max(data)]) //domain定义输入范围
    // .range([0, g_height]) //range（）定义输出范围
    .range([g_height, 0]) //range（）定义输出范围

// 通过d3下面的svg下面的line()实现line_generator函数
var line_generator = d3.svg.line()
    .x(function(d, i) { return scale_x(i); }) //x坐标点的值为data数组的下标，参数d表示传进来的数据，i表示下标
    .y(function(d) { return scale_y(d) }) //y坐标的值为数组中实际的每一项的值
    .interpolate("cardinal") //让线条变得光滑，不是折线而是光滑的曲线

// d3.select("g")
//     .append("path")
//     .attr("d", line_generator(data)) //通过d属性值，添加line_generator函数
//     // 其实d就是 path-data 的缩写，d= "M"

// 当页面有多个相同元素，select只能选择符合条件的第一个元素，想要选择其中某一个指定的元素，可以把那个元素赋给一个变量，然后使用变量名去实现
// 如下所示，g表示上面赋值的那个变量g,而不是标签<g></g>
g.append("path").attr("d", line_generator(data)) //通过d属性值，添加line_generator函数
    // 其实d就是 path-data 的缩写，d= "M"


// 使用d3的svg的axis()方法生成坐标轴
var x_axis = d3.svg.axis().scale(scale_x),
    y_axis = d3.svg.axis().scale(scale_y).orient("left") //沿left方向旋转90度

g.append("g")
    .call(x_axis)
    .attr("transform", "translate(" + 0 + "," + g_height + ")")

g.append("g")
    .call(y_axis)
    .append("text")
    .text("price($)")
    .attr("transform", "rotate(-90)") //文字逆时针旋转90度
    .attr("text-anchor", "end") //设置文字的对齐方式,在让他相对他自身当前的位置向右移动一定的距离，也就是向他自身的x轴方向偏移
    .attr("dy", "1em") //设置偏移量