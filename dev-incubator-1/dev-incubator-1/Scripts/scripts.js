var RangeFrom = -10;
var RangeTo = 10;
var Step = 1;
var A = 5;
var B = 5;
var C = 16;
var RangeMargin = Math.abs(RangeTo - RangeFrom) / 2

function Diagram () {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart (ctx, {
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

    for (var x = RangeFrom; x <= RangeTo; x += Step) {
        myChart.data.labels.push(''+x);
        myChart.data.datasets[0].data.push(f(x));
    }
    //Обновляем
    myChart.update();
  
    function f(x) { //Вычисление нужной функции
        return A*Math.pow(x,2) + B*x + C;
    }
}

window.addEventListener("load", Diagram); 
  