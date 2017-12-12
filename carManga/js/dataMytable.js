var $table = $('#table');
$(function() {
    $('#toolbar').find('select').change(function() {
        $table.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val()
        });
    });
})

window.operateEvents1 = {
    "click #btn_myimport": function(e, value, row, index) {
        var $this = $(this.parentNode.parentNode);
        // console.log($this.attr("className", "selected"));
        console.log(row.state);
        if (row.state == true) {
            $this.removeClass("selected");
            // console.log($this.children(".bs-checkbox input").prop("checked"));
            $this.children(".bs-checkbox input").prop("checked", "checked");
            row.state = false;
        } else if (row.state == undefined || row.state == false) {
            row.state = true;
            // console.log("row.state不等于true,改为" + row.state)
            $this.children(".bs-checkbox input").prop("checked", "");
            $this.addClass("selected");
        }
        //编辑详情事件
        // $(this).parent
        console.log(this);
        // console.log($(this));
        console.log(this.parentNode.parentNode.children[0].children[0]);
        console.log(this.parentNode.parentNode);
        // console.log(this.parentNode.parentNode.children[0].children[0].getAttribute("checked"));
        // detailmodal.open();
    }
}

function operateFormatter1(value, row, index) {
    return [
        '<button id="btn_myimport" type="button" class="RoleOfA btn-default bt-select btn btn-primary">导出</button>',
    ].join('');
}
// var btnMyimport = document.getElementsByClassName("btn_myimport");
// console.log(btnMyimport);
// 实时数据线图绘制
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('current_line_main'));
var timeTicket = '';
// 指定图表的配置项和数据
var option = {
    title: {
        text: '动态数据',
        textStyle: {
            // fontSize: 18,
            // fontWeight: 'bolder',
            color: 'white' // 主标题文字颜色
        },
        // subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['最新成交价', '预购队列']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: false
            },
            magicType: {
                show: true,
                type: ['line', 'bar']
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [{
        type: 'category',
        boundaryGap: true,
        data: (function() {
            var now = new Date();
            var res = [];
            var len = 10;
            while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                now = new Date(now - 2000);
            }
            return res;
        })()
    }, {
        type: 'category',
        boundaryGap: true,
        data: (function() {
            var res = [];
            var len = 10;
            while (len--) {
                res.push(len + 1);
            }
            return res;
        })()
    }],
    yAxis: [{
        type: 'value',
        scale: true,
        name: '价格',
        boundaryGap: [0.2, 0.2],
        axisLine: {
            lineStyle: {
                // color: 'white',//y轴线条颜色
            }
        }
    }, {
        type: 'value',
        scale: true,
        name: '预购量',
        boundaryGap: [0.2, 0.2]
    }],
    series: [{
        name: '预购队列',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        color: ['red'],

        data: (function() {
            var res = [];
            var len = 10;
            while (len--) {
                res.push(Math.round(Math.random() * 1000));
            }
            return res;
        })()
    }, {
        name: '最新成交价',
        type: 'line',
        data: (function() {
            var res = [];
            var len = 10;
            while (len--) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0);
            }
            return res;
        })()
    }]
};
var lastData = 11;
var axisData;
clearInterval(timeTicket);
timeTicket = setInterval(function() {
    lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
    lastData = lastData.toFixed(1) - 0;
    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

    // 动态数据接口 addData
    myChart.addData([
        [
            0, // 系列索引
            Math.round(Math.random() * 1000), // 新增数据
            true, // 新增数据是否从队列头部插入
            false // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
        ],
        [
            1, // 系列索引
            lastData, // 新增数据
            false, // 新增数据是否从队列头部插入
            false, // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
            axisData // 坐标轴标签
        ]
    ]);
}, 2100);

myChart.setOption(option);
// 实时数据线图绘制完毕