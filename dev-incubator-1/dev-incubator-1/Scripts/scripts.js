var myChart;

function isFloat_number(num) {
    return Number(num) === num && num % 1 !== 0;
}

class UserData {
    constructor(rangeFrom, rangeTo, step, a, b, c) {
        this.RangeFrom = Number(rangeFrom);
        this.RangeTo = Number(rangeTo);
        this.Step = parseFloat(step.replace(/,/, '.'));
        this.A = Number(a);
        this.B = Number(b);
        this.C = Number(c);
    }
}

function CreateDiagram() {
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

function DataValidation(userData) {
    ClearError();
    var result = true;
    var rangeCorrect = true;
    if (!Number.isInteger(userData.A)) {
        ShowError("The leading coefficient field is not a number");
        document.getElementsByName('inputA')[0].classList.add("error");
        result = false;
    }
    if (!Number.isInteger(userData.B)) {
        ShowError("The second coefficient field is not a number");
        document.getElementsByName('inputB')[0].classList.add("error");
        result = false;
    }
    if (!Number.isInteger(userData.C)) {
        ShowError("The free member field is not a number");
        document.getElementsByName('inputC')[0].classList.add("error");
        result = false;
    }
    if (!Number.isInteger(userData.Step) && !isFloat_number(userData.Step)) {
        ShowError("Step field is not a number");
        document.getElementsByName('step')[0].classList.add("error");
        result = false;
    } else {
        document.getElementsByName('step')[0].value = userData.Step;
        if (userData.Step <= 0) {
            ShowError("Step cannot be less than zero");
            document.getElementsByName('step')[0].classList.add("error");
            result = false;
        }
    }
    if (!Number.isInteger(userData.RangeFrom)) {
        ShowError("Range start field is not a number");
        document.getElementsByName('rangeFrom')[0].classList.add("error");
        result = false;
        rangeCorrect = false;
    }
    if (!Number.isInteger(userData.RangeTo)) {
        ShowError("End of range field is not a number");
        document.getElementsByName('rangeTo')[0].classList.add("error");
        result = false;
        rangeCorrect = false;
    }
    if (rangeCorrect && (userData.RangeTo - userData.RangeFrom < 0)) {
        ShowError("Range start point is greater than end point");
        document.getElementsByName('rangeFrom')[0].classList.add("error");
        document.getElementsByName('rangeTo')[0].classList.add("error");
        result = false;
    }
    return result;
}

function ClearError(text) {
    var list = document.getElementsByClassName('validation-list-error')[0];
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    document.getElementsByClassName('message--error')[0].classList.add("hide");
    document.querySelectorAll('input.error').forEach(n => n.classList.remove('error'));
}

function ShowError(text) {
    var list = document.getElementsByClassName('validation-list-error')[0];
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    list.appendChild(li);
    document.getElementsByClassName('message--error')[0].classList.remove("hide");
}

function StartPlot() {
    let userData = new UserData(
        document.getElementsByName('rangeFrom')[0].value,
        document.getElementsByName('rangeTo')[0].value,
        document.getElementsByName('step')[0].value,
        document.getElementsByName('inputA')[0].value,
        document.getElementsByName('inputB')[0].value,
        document.getElementsByName('inputC')[0].value);

    if (DataValidation(userData)) {
        SendData(userData);
    } else {
        CreateDiagram();
    }

}

function SendData(userData) {
    var dataType = 'application/x-www-form-urlencoded; charset=utf-8';
    var data = $('form').serialize();

    var dataType = 'application/json; charset=utf-8';
    var data = {
        RangeFrom: userData.RangeFrom,
        RangeTo: userData.RangeTo,
        Step: userData.Step,
        A: userData.A,
        B: userData.B,
        C: userData.C
    }

    $.ajax({
        type: 'POST',
        url: '/Home/SendDataJson',
        dataType: 'json',
        contentType: dataType,
        data: JSON.stringify(data),
        success: function (points) {
            if (!points) {
                CreateDiagram();
                alert("Server error\nAn error occurred on the server due to incorrectly entered data.");
            }
            else {
                CreateDiagram();
                ChartPaint(points);
                ChartUpdate();
            }
        }
    });
}

window.addEventListener("load", CreateDiagram);