(function (global) {

    // function Calendar(width, heigth) {
    //     this.width = width;
    //     this.heigth = heigth;
    //     this.currentMonth = [];
    //     this.week = [];
    //     this.weekly = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // }

    // Calendar.prototype.render = function () {

    //     var parent = document.querySelector('.row');

    //     for (var i = 0; i < this.week.length; i++) {
    //         var row = document.createElement('div');
    //         row.classList.add('col-12', 'week');
    //         parent.appendChild(row);
    //         for (var j = 0; j < this.week[i].length; j++) {
    //             var div = document.createElement('div');
          
    //             div.innerHTML = this.week[i][j];


    //             div.classList.add('col-1', 'day');
    //             row.appendChild(div);
    //         }
    //     }

    // };

    // Date.prototype.isLeapYear = function () {
    //     var y = this.getFullYear();
    //     return y % 4 == 0 && y % 100 != 0 || y % 400 == 0;
    // };
    // Date.prototype.getDaysInMonth = function () {
    //     return arguments.callee[this.isLeapYear() ? 'L' : 'R'][this.getMonth()];
    // };

    // Date.prototype.getDaysInMonth.R = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Date.prototype.getDaysInMonth.L = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Calendar.prototype.createCalendar = function () {
    //     var weekly = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     var month = new Date().getDaysInMonth();
    //     var cal = setData(2017, 0, 1);
    //     var month = cal.getMonth();
    //     var year = cal.getFullYear();
    //     var week = weekly[cal.getDay()];

    //     for (var i = 1; i < 7; i++) {
    //         this.week[0] = [];
    //         this.week[i] = [];
    //         this.week[0][i] = weekly[i];
    //         for (var j = 0; j < weekly.length; j++) {
                
                
    //             this.week[i][j] = 0;
    //         }
    //     }
    //     console.log(this.week);
    // };

    // function getData() {
    //     var date = new Date();
    //     var dd = date.getDate();
    //     var mm = date.getMonth(); //January is 0!
    //     var yyyy = date.getFullYear();
    //     var fileName = dd + "-" + (mm + 1) + '-' + yyyy;
    //     return fileName;
    // };

    // function setData(yyyy, mm, dd, hh, mn) { //универсальный конструктор времени 
    //     if (yyyy === 0 || yyyy === undefined) yyyy = new Date().getFullYear();
    //     if (mm === undefined) mm = new Date().getMonth();
    //     if (dd === 0 || dd === undefined) dd = new Date().getDate();
    //     if (hh === 0 || hh === undefined) hh = new Date().getHours();
    //     if (mn === 0 || mn === undefined) mn = new Date().getMinutes();

    //     var date = new Date(yyyy, mm, dd, hh, mn);
    //     return date;
    // }

    // var cal1 = new Calendar(7, 6);
    // cal1.createCalendar();
    // cal1.render();




var D1 = new Date(),
    D1last = new Date(D1.getFullYear(),D1.getMonth()+1,0).getDate(), // последний день месяца
    D1Nlast = new Date(D1.getFullYear(),D1.getMonth(),D1last).getDay(), // день недели последнего дня месяца
    D1Nfirst = new Date(D1.getFullYear(),D1.getMonth(),1).getDay(), // день недели первого дня месяца
    calendar1 = '<tr>',
    month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]; // название месяца, вместо цифр 0-11

// пустые клетки до первого дня текущего месяца
if (D1Nfirst != 0) {
  for(var  i = 1; i < D1Nfirst; i++) calendar1 += '<td>';
}else{ // если первый день месяца выпадает на воскресенье, то требуется 7 пустых клеток 
  for(var  i = 0; i < 6; i++) calendar1 += '<td>';
}

// дни месяца
for(var  i = 1; i <= D1last; i++) {
  if (i != D1.getDate()) {
    calendar1 += '<td>' + i;
  }else{
    calendar1 += '<td id="today">' + i;  // сегодняшней дате можно задать стиль CSS
  }
  if (new Date(D1.getFullYear(),D1.getMonth(),i).getDay() == 0) {  // если день выпадает на воскресенье, то перевод строки
    calendar1 += '<tr>';
  }
}

// пустые клетки после последнего дня месяца
if (D1Nlast != 0) {
  for(var  i = D1Nlast; i < 7; i++) calendar1 += '<td>';
}

document.querySelector('#calendar1 tbody').innerHTML = calendar1;
document.querySelector('#calendar1 thead td:last-child').innerHTML = D1.getFullYear();
document.querySelector('#calendar1 thead td:first-child').innerHTML = month[D1.getMonth()];



} (window));