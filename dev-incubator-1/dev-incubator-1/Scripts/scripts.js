var myChart;

function Diagram() {
    var ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'f(x)',
                data: [],
                borderColor: '#3e95cd',
                borderWidth: 1.5,
                fill: false
            }]
        },
        options: {
            responsive:
                false,
            scales: {
                xAxes: [{
                    display: true
                }],
                yAxes: [{
                    display: true
                }]
            },
            legend: {
                display: false,
            },
            tooltips: { enabled: false },
            hover: { mode: null },
            events: []
        }
    });
}

function ChartPaint(points) {
    for (var i = 0; i < points.length; i++) {
        myChart.data.labels.push('' + points[i].PointX);
        myChart.data.datasets[0].data.push(points[i].PointY);
    }
}

function f(x, a, b, c) {
    return a * Math.pow(x, 2) + b * x + c;
}

function ChartUpdate() {
    myChart.update();
}

function StartPlot() {
    var RangeFrom = Number.parseInt(document.getElementsByName('inputFrom')[0].value);
    var RangeTo = Number.parseInt(document.getElementsByName('inputTo')[0].value);
    var Step = Number.parseFloat(document.getElementsByName('inputStep')[0].value);
    var A = Number.parseInt(document.getElementsByName('inputA')[0].value);
    var B = Number.parseInt(document.getElementsByName('inputB')[0].value);
    var C = Number.parseInt(document.getElementsByName('inputC')[0].value);

    SendData(RangeFrom, RangeTo, Step, A, B, C);
}

function SendData(RangeFrom, RangeTo, Step, A, B, C) {
    var dataType = 'application/x-www-form-urlencoded; charset=utf-8';
    var data = $('form').serialize();

    var dataType = 'application/json; charset=utf-8';
    var data = {
        RangeFrom: RangeFrom,
        RangeTo: RangeTo,
        Step: Step,
        A: A,
        B: B,
        C: C
    }

    $.ajax({
        type: 'POST',
        url: '/Home/SendDataJson',
        dataType: 'json',
        contentType: dataType,
        data: JSON.stringify(data),
        success: function (points) {
            if (!points) {
                Diagram();
                alert("Server error\nAn error occurred on the server due to incorrectly entered data.");
            }
            else {
                Diagram();
                ChartPaint(points);
                ChartUpdate();
            }
        }
    });
}

window.addEventListener("load", Diagram);
