var myChart;

function Diagram() {
    var ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], //Подписи оси x
            datasets: [{
                label: 'f(x)', //Метка
                data: [], //Данные
                borderColor: '#3e95cd', //Цвет
                borderWidth: 1.5, //Толщина линии
                fill: false //Не заполнять под графиком
            }]
        },
        options: {
            responsive:
                false, //Вписывать в размер canvas
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
            }
        }
    });

    //StartPlot();
}

function ChartCalc() {
    var RangeFrom = Number.parseInt(document.getElementsByName('inputFrom')[0].value);
    var RangeTo = Number.parseInt(document.getElementsByName('inputTo')[0].value);
    var Step = Number.parseInt(document.getElementsByName('inputStep')[0].value);

    for (var x = RangeFrom; x <= RangeTo; x += Step) {
        myChart.data.labels.push('' + x);
        myChart.data.datasets[0].data.push(f(x));
    }
}

function f(x) {
    var A = Number.parseInt(document.getElementsByName('inputA')[0].value);
    var B = Number.parseInt(document.getElementsByName('inputB')[0].value);
    var C = Number.parseInt(document.getElementsByName('inputC')[0].value);
    return A * Math.pow(x, 2) + B * x + C;
}

function ChartUpdate() {
    myChart.update();
}

function StartPlot() {
    Diagram();
    ChartCalc();
    ChartUpdate();
}

window.addEventListener("load", Diagram);
