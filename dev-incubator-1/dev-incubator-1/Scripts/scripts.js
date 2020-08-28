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

function ChartCalc(RangeFrom, RangeTo, Step, A, B, C) {
    for (var x = RangeFrom; x <= RangeTo; x += Step) {
        myChart.data.labels.push('' + x);
        myChart.data.datasets[0].data.push(f(x, A, B, C));
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
    Diagram();
    ChartCalc(RangeFrom, RangeTo, Step, A, B, C);
    ChartUpdate();
}

function SendData(RangeFrom, RangeTo, Step, A, B, C) {
    //form encoded data
    var dataType = 'application/x-www-form-urlencoded; charset=utf-8';
    var data = $('form').serialize();

    //JSON data
    var dataType = 'application/json; charset=utf-8';
    var data = {
        RangeFrom: RangeFrom,
        RangeTo: RangeTo,
        Step: Step,
        A: A,
        B: B,
        C: C
    }

    console.log(data);
    console.log('Submitting form...');
    $.ajax({
        type: 'POST',
        url: '/Home/SendDataJson',
        dataType: 'json',
        contentType: dataType,
        data: JSON.stringify(data),
        success: function (result) {
            console.log('Data received: ');
            console.log(result);
        }
    });
}

window.addEventListener("load", Diagram);
