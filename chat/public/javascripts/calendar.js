(function (global) {


    function Calendar() {
        this.date = new Date();
        this.month = new Date().getMonth();
        this.dateLastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        this.dayWeekLast = new Date(this.date.getFullYear(), this.date.getMonth(), this.dateLastDay).getDay();
        this.dayWeekFirst = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jule', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        this.week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.week1 = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        this.num = 0;
        this.tasks = [];
    }


    function Tasks(id, job, teacher, block) {
        this.id = id;
        this.job = job;
        this.teacher = teacher;
        this.block = block;

    }

    function Prepod(name, dtStart, dtEnd, nameBlock) {
        this.name = name;
        this.dtStart = dtStart;
        this.dtEnd = dtEnd;
        this.nameBlock = nameBlock;
    }

    Calendar.prototype.render = function () {
        var parent = document.getElementById('wrapper');
        var dayweek = document.createElement('div');
        var calendar = document.createElement('div');
        var daysw = document.createElement('div');
        var days = document.createElement('div');
        calendar.classList.add('calendar');
        parent.appendChild(calendar);

        var row = document.createElement('div');
        var last = document.createElement('div');
        var next = document.createElement('div');
        var currentCal = document.createElement('div');
        var calMenu = document.createElement('div');

        last.classList.add('col-3', 'lastMonth');
        last.setAttribute('id', 'last');
        currentCal.classList.add('col-6', 'currentCal');
        next.classList.add('col-3', 'nextMonth');
        next.setAttribute('id', 'next');
        calMenu.classList.add('col-12', 'calMenu');
        daysw.classList.add('daysWeek');
        days.classList.add('setka')

        last.innerHTML = '<';
        next.innerHTML = '>';
        var month = document.createElement('p');
        month.innerHTML = this.months[this.date.getMonth()];
        var year = document.createElement('p');
        year.innerHTML = this.date.getFullYear();
        currentCal.appendChild(month);
        currentCal.appendChild(year);

        calMenu.appendChild(last);
        calMenu.appendChild(currentCal);
        calMenu.appendChild(next);
        row.appendChild(calMenu);

        row.classList.add('row');
        calendar.appendChild(row);
        calendar.appendChild(daysw);
        calendar.appendChild(days);

        //рендерит дни недели в заголовке
        for (var i = 0; i < this.week.length; i++) {
            var dayweek = document.createElement('div');
            dayweek.innerHTML = this.week[i];
            dayweek.classList.add('weekDay');
            daysw.appendChild(dayweek);
        }

        if (this.dayWeekFirst != 0) {
            for (var i = 1; i < this.dayWeekFirst; i++) {
                var div1 = document.createElement('div');
                var div = document.createElement('div');
                div.classList.add('days');
                div1.classList.add('day');
                div1.setAttribute('id', 'null');
                days.appendChild(div1);
                div1.appendChild(div);
                this.num += 1;
            }
        } else {
            for (var i = 0; i < 6; i++) {
                var div = document.createElement('div');
                var div1 = document.createElement('div');
                div.classList.add('days');
                div1.classList.add('day');
                div1.setAttribute('id', 'null');
                days.appendChild(div1);
                div1.appendChild(div);
                this.num += 1;
            }
        }
        //генерит дни
        for (var i = 1; i <= this.dateLastDay; i++) {
            if (i != this.date.getDate()) {
                var div1 = document.createElement('div');
                var div = document.createElement('div');
                div.classList.add('days');
                div1.classList.add('day');
                div1.setAttribute('id', i + '-' + this.date.getMonth() + '-' + this.date.getFullYear());
                div.innerHTML = i;
                days.appendChild(div1);
                div1.appendChild(div);
                this.num += 1;
            } else if (i === new Date().getDate() && this.date.getMonth() === new Date().getMonth() && this.date.getFullYear() === new Date().getFullYear()) {
                var div = document.createElement('div');
                var div1 = document.createElement('div');
                div.classList.add('days');
                div1.classList.add('today', 'day');
                div1.setAttribute('id', i + '-' + this.date.getMonth() + '-' + this.date.getFullYear());
                div.innerHTML = i;
                days.appendChild(div1);
                div1.appendChild(div);
                this.num += 1;

            }
        }
        if (this.num !== 42) {
            var num_ = 41 - this.num;
            for (var i = 0; i <= num_; i++) {
                var div = document.createElement('div');
                var div1 = document.createElement('div');
                div.classList.add('days');
                div1.classList.add('day');
                div1.setAttribute('id', 'null');
                days.appendChild(div1);
                div1.appendChild(div);
            }
        }

        this.clickality();
        this.renderTask();
    };

    Calendar.prototype.clickality = function () {

        var date = this.date;
        var that = this;
        var parent = document.getElementById('wrapper');
        var calendar = document.querySelector('.calendar');
        calendar.addEventListener('click', function (event) {
            that.num = 0;
            if (event.target.id === 'last') {
                that.date = setData(date.getFullYear(), date.getMonth() - 1, date.getDate());
                that.dateLastDay = new Date(that.date.getFullYear(), that.date.getMonth() + 1, 0).getDate();
                that.dayWeekLast = new Date(that.date.getFullYear(), that.date.getMonth(), that.dateLastDay).getDay();
                that.dayWeekFirst = new Date(that.date.getFullYear(), that.date.getMonth(), 1).getDay();
                parent.removeChild(calendar);
                that.month = that.date.getMonth();
                that.render();

            } else if (event.target.id === 'next') {
                that.date = setData(date.getFullYear(), date.getMonth() + 1, date.getDate());
                that.dateLastDay = new Date(that.date.getFullYear(), that.date.getMonth() + 1, 0).getDate();
                that.dayWeekLast = new Date(that.date.getFullYear(), that.date.getMonth(), that.dateLastDay).getDay();
                that.dayWeekFirst = new Date(that.date.getFullYear(), that.date.getMonth(), 1).getDay();
                parent.removeChild(calendar);
                that.month = that.date.getMonth();
                that.render();
            }
        });
    };


    Calendar.prototype.createTask = function (obj) {
        var date1 = obj.dtStart;
        var date2 = obj.dtEnd;

        var date1LastDay = new Date(date1.getFullYear(), date1.getMonth() + 1, 0).getDate();
        var dayWeekLast1 = new Date(date1.getFullYear(), date1.getMonth(), date1LastDay).getDay();
        var dayWeekFirst1 = new Date(date1.getFullYear(), date1.getMonth(), 1).getDay();
        var date1Month = date1.getMonth();
        var date1Year = date1.getFullYear();

        var date2LastDay = new Date(date2.getFullYear(), date2.getMonth() + 1, 0).getDate();
        var dayWeekLast2 = new Date(date2.getFullYear(), date2.getMonth(), date2LastDay).getDay();
        var dayWeekFirst2 = new Date(date2.getFullYear(), date2.getMonth(), 1).getDay();
        var date2Month = date2.getMonth();
        var date2Year = date2.getFullYear();

        console.log(date2Year - date1Year);

        // if (!date2Year - date1Year){
        //     var kolM = date2Month - date1Month;
        //     var kolD = date2.getDate() - date1LastDay;
        //     console.log(kolD)
        // }
        //     for(var j=0;j<){

        //     }


        for (var i = 1; i <= date1LastDay; i++) {
            var objdate = new Date(obj.dtStart.getFullYear(), obj.dtStart.getMonth(), i).getDay();
            if (objdate === 1 ||
                objdate === 4 ||
                objdate === 6) {
                var day = i + '-' + date1Month + '-' + date1Year;
                this.tasks.push(new Tasks(day, 0, obj.name, obj.nameBlock));
            }
        }
    };


    Calendar.prototype.renderTask = function () {
        var parent = document.querySelectorAll('.day');

        for (var i = 0; i < this.tasks.length; i++) {
            for (var j = 0; j < parent.length; j++) {
                if (this.tasks[i].id === parent[j].id) {

                    var day = parent[j];
                    var div = document.createElement('div');
                    div.classList.add('task');
                    var close = document.createElement('p');
                    close.classList.add('close');
                    close.innerHTML = 'x';
                    div.innerHTML = 'Teacher: ' + this.tasks[i].teacher + ' Block: ' + this.tasks[i].block;
                    div.appendChild(close);
                    day.appendChild(div);
                }
            }
        }

        var close = document.querySelectorAll('.close');
        for (var i = 0; i < close.length; i++) {
            close[i].addEventListener('click', function (e) {
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            })
        }
    };





    var vitaly = new Prepod('Vitaly', setData(2017, 1, 1), setData(2017, 1, 28), 'JavaScript');




    // Calendar.prototype.createJobs = function () {
    //     var that = this;

    //     parent.addEventListener('click', function (event) {
    //         console.log()
    //         if (event.target.classList[0] === 'day') {
    //             var job = document.getElementById(event.target.id);
    //             var input = document.createElement('textarea');

    //             input.style.top = event.clientY + 150 + 'px';
    //             input.style.left = event.clientX + 'px';
    //             job.appendChild(input);
    //             input.classList.add('newTask');
    //         }
    //         if (job !== undefined) {
    //             event.target.addEventListener('dblclick', function (event) {
    //                 var newTask = document.createElement('div');
    //                 newTask.innerHTML = input.value;
    //                 input.appendChild(newTask);
    //                 if (event.target.classList[0] === 'newTask') {
    //                     job.removeChild(event.target);
    //                 }
    //             });
    //         }
    //     });
    // };




    var cal = new Calendar();
    cal.createTask(vitaly);
    cal.render();
    console.log(cal);



    function setData(yyyy, mm, dd, hh, mn) { //универсальный конструктор времени 
        if (yyyy === 0 || yyyy === undefined) yyyy = new Date().getFullYear();
        if (mm === undefined) mm = new Date().getMonth();
        if (dd === undefined) dd = new Date().getDate();
        if (hh === undefined) hh = new Date().getHours();
        if (mn === undefined) mn = new Date().getMinutes();

        var date = new Date(yyyy, mm, dd, hh, mn);
        return date;
    }

    var socket = io.connect('http://localhost:3000');

    jQuery('#button1').click(socketPost);

    function getValueSearch() {
        return {
            subject: document.getElementById('subject').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            prepod: document.getElementById('prepod').value,
            type: document.getElementById('type').value
        }
    }

    function socketPost() {
        if (getValueSearch().id_grp === "" || getValueSearch().dt_start === "" ||
            getValueSearch().dt_end === "" || getValueSearch().event === "" || getValueSearch().id_color === "") {
            alert('Заполните все поля.');
        } else {
            var result = getValueSearch();
            console.log(result);
            socket.emit('newEvent', result);
            socket.on('newEventToDB', function (data) {
                if (!data) {
                    jQuery('.administration').append('<div class="contaner"><p>Что-то пошло не так</p></div>');
                } else {
                    jQuery('.administration').append('<div class="contaner"><p>Добавлена ' + data.affectedRows + ' новая запись.</p></div>');
                }
            });
        }
    
    }

  


}(window));