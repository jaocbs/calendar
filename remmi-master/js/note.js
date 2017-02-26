(function (global) {


    function TaskManager(containerID) {
        this.userNames = [];
        this.containerID = containerID;
        this.user = {};
        this.todayDate;
        Calendar.apply(this, arguments);
    }

    function User(name) {
        this.name = name;
        this.tasks = [];
        this.theme = 'whitePage';

    }

    function GetTask(task, date) {
        this.task = task;
        if (date === undefined) { this.date = setData(); } else { this.date = date; };

        this.subtask;
    }

    function getData(task) {
        var date = task.date;
        var dd = date.getDate();
        var mm = date.getMonth(); //January is 0!
        var yyyy = date.getFullYear();
        var fileName = dd + "-" + (mm + 1) + '-' + yyyy;
        return fileName;
    }

    TaskManager.prototype.createStartPage = function (theme) {//отрисовка элементов стартовой
        // global elem
        var wrapper = document.getElementById('wrapper'),
            row = document.createElement('div'),
            header = document.createElement('header'),
            content = document.createElement('div'),
            footer = document.createElement('footer'),
            nameApp = document.createElement('div'),
            p = document.createElement('p'),
            form = document.createElement('form'),
            label = document.createElement('label'),
            btn = document.createElement('button'),
            input = document.createElement('input');
        if (theme === undefined) {
            theme = 'whitePage';
        } else {
            theme = this.user.theme;
        }
        row.classList.add('row', 'whitePage');
        header.classList.add('col-12');
        content.classList.add('col-12', 'content');
        footer.classList.add('col-12');
        nameApp.classList.add('nameApp', 'col-12');

        p.appendChild(document.createTextNode('remmi'));
        wrapper.appendChild(row);
        row.appendChild(header);
        row.appendChild(content);
        row.appendChild(footer)
        content.appendChild(nameApp);
        nameApp.appendChild(p);

        //forms
        label.setAttribute('for', 'login');
        input.setAttribute('id', 'login');
        input.setAttribute('placeholder', 'your name');
        input.setAttribute('type', 'text');
        input.classList.add('inputLogin');
        btn.classList.add('btn');
        btn.appendChild(document.createTextNode('enter'));
        nameApp.appendChild(input);
        nameApp.appendChild(btn);
        var that = this;
        btn.addEventListener('click', function () {
            var lenUsers = that.userNames.length;
            var iter = 0;
            // console.log(input.value);
            // var userName = input.value;
            // if(input.value === ''|| input.value === new RegExp('\s')) return;
            if (that.userNames.length !== 0) {
                var inputvalue = input.value;
                //сделана проверка введенного логина на наличие данного пользователя
                for (var i = 0; i < lenUsers; i++) {
                    console.log(i);
                    console.log(lenUsers);
                    console.log('ищем пользователя');
                    console.log(inputvalue);
                    console.log(that.userNames[i].name);
                    if (inputvalue === that.userNames[i].name) {
                        //передача найденого объекта в рабочее свойство
                        that.user = that.userNames[i];
                        console.log('юзер найден');
                        wrapper.removeChild(row);
                        that.render(that.user.theme);
                        return;
                    }
                    console.log(i);
                    //тут ошибка была, вроде вылечил
                    if (i + 1 === lenUsers && inputvalue !== that.userNames[i].name) {
                        console.log(i);
                        console.log('юзер не найден, создаем нового');
                        that.renderUser(inputvalue, wrapper, row);
                    }


                }
            } else if (that.userNames.length === 0) {
                console.log('юзеров нет, создаем нового');
                that.renderUser(inputvalue, wrapper, row);
            }
        })
    };

    TaskManager.prototype.renderUser = function (inputvalue, wrapper, row) {
        console.log(this.userNames.length);
        var theme = row.classList;
        if (theme === undefined) {
            theme = 'whitePage';
        } else if (typeof theme === 'object') {
            theme = theme[1];
        }
        this.user = new User(inputvalue);
        this.userNames.push(this.user);
        console.log(this.userNames);
        wrapper.removeChild(row);
        this.render(theme);
        console.log('создан новый пользователь');
        console.log(this);
    };

    TaskManager.prototype.render = function (theme) {
        var wrapper = document.getElementById('wrapper'),
            row = document.createElement('div'),
            headrow = document.createElement('div'),
            header = document.createElement('header'),
            content = document.createElement('div'),
            footer = document.createElement('footer'),
            footrow = document.createElement('div'),
            oops = document.createElement('p'),
            today = document.createElement('a'),
            upcoming = document.createElement('a'),
            future = document.createElement('a'),
            inputTask = document.createElement('input'),
            voice = document.createElement('i'),
            option = document.createElement('a'),
            optionP = document.createElement('p'),
            optionUl = document.createElement('ul'),
            optionLi = document.createElement('li'),
            todayMain = document.createElement('div'),
            upcomingMain = document.createElement('div'),
            futureMain = document.createElement('div'),
            that = this;
        if (theme === undefined) {
            theme = 'whitePage';
        } else if (typeof theme === 'object') {
            theme = theme[1];
        }
        row.classList.add('row', theme);

        headrow.classList.add('row');
        header.classList.add('col-12');
        content.classList.add('col-12', 'main');
        footrow.classList.add('row');
        footer.classList.add('col-12');
        today.classList.add('col-4', 'headerlinks');
        upcoming.classList.add('col-4', 'headerlinks');
        future.classList.add('col-4', 'headerlinks');
        voice.classList.add('fa', 'fa-microphone');
        voice.setAttribute('aria-hidden', 'true');
        inputTask.classList.add('inputTask', 'col-8');
        inputTask.setAttribute('type', 'text');
        inputTask.setAttribute('placeholder', 'Enter your task');
        voice.classList.add('footerVoice', 'col-2');
        option.classList.add('option', 'col-2');
        todayMain.classList.add('active', 'today');
        upcomingMain.classList.add('upcoming');
        futureMain.classList.add('future');


        wrapper.appendChild(row);
        row.appendChild(header);
        row.appendChild(content);
        row.appendChild(footer);
        content.appendChild(todayMain);
        content.appendChild(upcomingMain);
        content.appendChild(futureMain);
        header.appendChild(headrow);
        headrow.appendChild(today);
        headrow.appendChild(upcoming);
        headrow.appendChild(future);
        today.appendChild(document.createTextNode('today'));
        upcoming.appendChild(document.createTextNode('upcoming'));
        future.appendChild(document.createTextNode('future'));
        footer.appendChild(footrow);
        footrow.appendChild(inputTask);
        footrow.appendChild(voice);
        footrow.appendChild(option);
        option.appendChild(document.createTextNode('...'));


        option.setAttribute('href', '#open');

        today.setAttribute('id', 'today');
        upcoming.setAttribute('id', 'upcoming');
        future.setAttribute('id', 'future');
        todayMain.setAttribute('id', 'today');
        upcomingMain.setAttribute('id', 'upcoming');
        futureMain.setAttribute('id', 'future');
        console.log('ищем задачи')
        this.checkTasks();
        this.createOption();
        voice.addEventListener('click', this.createTasks());

        header.addEventListener('click', function (event) {
            var id = event.target.getAttribute('id');
            if (id === 'today') {
                todayMain.classList.add('active');
                upcomingMain.classList.remove('active');
                futureMain.classList.remove('active');

                today.style.color = '#F33B64';
                upcoming.style.color = 'rgba(204, 204, 204, 0.6)';
                future.style.color = 'rgba(204, 204, 204, 0.6)';

            } else if (id === 'upcoming') {
                todayMain.classList.remove('active');
                upcomingMain.classList.add('active');
                futureMain.classList.remove('active');

                today.style.color = 'rgba(204, 204, 204, 0.6)';
                upcoming.style.color = '#FF8C00';
                future.style.color = 'rgba(204, 204, 204, 0.6)';
            } else if (id === 'future') {
                todayMain.classList.remove('active');
                upcomingMain.classList.remove('active');
                futureMain.classList.add('active');

                today.style.color = 'rgba(204, 204, 204, 0.6)';
                upcoming.style.color = 'rgba(204, 204, 204, 0.6)';
                future.style.color = '#3BA4F3';
            }

        })
    };

    TaskManager.prototype.createOption = function () {
        var option = document.getElementsByClassName('option');
        var row = document.getElementsByClassName('row');
        var modal = document.createElement('div');
        var modalContaner = document.createElement('div');
        var close = document.createElement('a');
        var ul = document.createElement('ul');
        var div = document.createElement('div');
        var closeI = document.createElement('i');

        close.classList.add('closeSett');
        closeI.classList.add('fa', 'fa-times-circle-o', 'closeSett');
        closeI.setAttribute('aria-hidden', 'true');
        close.setAttribute('href', '#close');
        div.appendChild(close);
        close.appendChild(closeI);

        modalContaner.appendChild(div);
        modalContaner.appendChild(ul);
        var opt = ['Settings', 'Switch mode', 'Buy full version', 'Rate us', 'Sign out'];
        for (var i = 0; i < opt.length; i++) {
            var li = document.createElement('li');
            li.setAttribute('id', 'opt' + i);
            li.innerHTML = opt[i];
            ul.appendChild(li);
        }

        modal.setAttribute('class', 'modal');
        modal.setAttribute('id', 'open');
        modalContaner.setAttribute('class', 'modal-container');
        close.addEventListener('click', function () {
            modalContaner.classList.remove('slideUp');
            // modalContaner.classList.add('slideDown');
            // modalContaner.style.bottom = '-100%';

        });
        option[0].addEventListener('click', function () {
            // modalContaner.classList.remove('slideDown');
            modalContaner.classList.add('slideUp');
        });
        row[0].appendChild(modal);
        modal.appendChild(modalContaner);
        this.optMetods(modal, row[0]);
    };

    TaskManager.prototype.optMetods = function (modal, row) {
        var that = this;
        var wrapper = document.getElementById('wrapper');
        modal.addEventListener('click', function (event) {
            var optId = event.target;
            if (optId.id === 'opt4') {
                var theme = row.classList;
                wrapper.removeChild(row);
                that.user = {};
                console.log(that.userNames);
                var theme = that.user.theme;
                that.createStartPage(theme);
                //to-do
            } else if (optId.id === 'opt1') {
                if (row.classList[1] === 'whitePage') {
                    row.classList.remove('whitePage');
                    row.classList.add('darkPage');
                    that.user.theme = 'darkPage';
                } else if (row.classList[1] === 'darkPage') {
                    row.classList.remove('darkPage');
                    row.classList.add('whitePage');
                    that.user.theme = 'whitePage';
                }

            }
        });
    };


    TaskManager.prototype.checkTasks = function () {
        if (this.user) {
            //to-do
            if (this.user.tasks.length === 0) {
                var oops = document.createElement('div');
                oops.classList.add('oops');
                oops.appendChild(document.createTextNode('Oww! No task for today!'));
                var content = document.getElementsByClassName('main');
                content[0].appendChild(oops);
                console.log('Задач нет');
            } else { //cаммая долгая функция в моей жизни
                //определяет в методе рендер таск куда именно нужно рендарить задачи
                this.checkDate();
                console.log('Задач нашлись');
            }
        }
    };



    function setData(yyyy, mm, dd, hh, mn) { //универсальный конструктор времени 
        if (yyyy === 0 || yyyy === undefined) yyyy = new Date().getFullYear();
        if (mm === undefined) mm = new Date().getMonth();
        if (dd === 0 || dd === undefined) dd = new Date().getDate();
        if (hh === 0 || hh === undefined) hh = new Date().getHours();
        if (mn === 0 || mn === undefined) mn = new Date().getMinutes();

        var date = new Date(yyyy, mm, dd, hh, mn);
        return date;
    }


    TaskManager.prototype.createTasks = function () {
        var input = document.getElementsByClassName('inputTask'),
            footerVoice = document.getElementsByClassName('footerVoice'),
            that = this;
        //новое исполнение данной функции

        input[0].addEventListener('click', function (event) {
            var wrapper = document.getElementById('wrapper');
            for (var i = 0; i < wrapper.childNodes.length; i++) {
                if (wrapper.childNodes[i].className === 'constTask') {
                    wrapper.removeChild(wrapper.childNodes[i]);
                }
                if (wrapper.childNodes[i].className === 'row whitePage' || wrapper.childNodes[i].className === 'row darkPage') {
                    wrapper.childNodes[i].style.display = 'none';
                }
            }
            var constTask = document.createElement('div');



            var closeConst = document.createElement('div');
            var inputDiv = document.createElement('div');
            var naviConst = document.createElement('div');
            var calend = document.createElement('div');
            var closeConstI = document.createElement('i');
            var inputConst = document.createElement('textarea');
            var date = document.createElement('div');
            var remember = document.createElement('div');
            var next = document.createElement('div');
            var row = document.createElement('div');
            var nextI = document.createElement('i');
            var rememberI = document.createElement('i');
            var dateI = document.createElement('i');
            var moment;

            date.classList.add('dateRemember', 'col-4');
            remember.classList.add('remember', 'col-4');
            next.classList.add('next', 'col-3');
            nextI.classList.add('fa', 'fa-arrow-circle-right');
            rememberI.classList.add('fa', 'fa-clock-o');
            nextI.setAttribute('aria-hidden', 'true');
            rememberI.setAttribute('aria-hidden', 'true');
            inputConst.setAttribute('type', 'text');
            inputConst.setAttribute('rows', '4');
            inputConst.setAttribute('placeholder', 'text');


            dateI.classList.add('fa', 'fa-calendar');
            dateI.setAttribute('aria-hidden', 'true');

            closeConst.classList.add('closeConst');
            constTask.classList.add('constTask');
            closeConstI.classList.add('fa', 'fa-times');
            inputDiv.classList.add('inputDiv');
            naviConst.classList.add('naviConst');
            calend.classList.add('calend');
            inputConst.classList.add('inputConst');
            closeConstI.setAttribute('aria-hidden', 'true');
            row.classList.add('row');


            date.appendChild(dateI);
            date.appendChild(document.createTextNode(setData().toDateString().substr(0, setData().toDateString().length - 5)));


            remember.appendChild(rememberI);
            remember.appendChild(document.createTextNode('Remind me'));
            next.appendChild(nextI);
            row.appendChild(date);
            row.appendChild(remember);
            row.appendChild(next);
            naviConst.appendChild(row);
            inputDiv.appendChild(inputConst);
            closeConst.appendChild(closeConstI);
            constTask.appendChild(closeConst);
            constTask.appendChild(inputDiv);
            constTask.appendChild(naviConst);
            constTask.appendChild(calend);
            wrapper.appendChild(constTask);




            closeConst.addEventListener('click', function (event) {
                inputConst.value = '';
                wrapper.removeChild(wrapper.childNodes[1]);
                wrapper.childNodes[0].style.display = 'block';

            });

            date.addEventListener('click', function (event) {
                var cal = new Calendar();
                cal.render();
                date.style.color = '#50E3C2';
                date.style.borderColor = '#50E3C2';
    
                var calend = document.querySelector('.calend');
                var day = document.querySelectorAll('.day');
           
                calend.addEventListener('click', function (event) {
                    if (event.target.className === 'day' || event.target.className === 'today') {
                        moment = setData(cal.date.getFullYear(), cal.date.getMonth(), event.target.id);
              
                        for (var i = 0; i < day.length; i++) {
                            day[i].style.color = 'black';
                        }
                        date.innerText = '';
                        date.appendChild(document.createTextNode(moment.toDateString().substr(0, setData().toDateString().length - 5)));
                        event.target.style.color = '#50E3C2';
                    }



                });
            });


            next.addEventListener('click', function (event) {
                if (inputConst.value !== '') { //генериться задача только в случае наличия инфы в поле
                    // to-do
                    console.log(moment);
                    that.user.tasks.push(new GetTask(inputConst.value, moment));
                    console.log(that.user);
                    wrapper.removeChild(wrapper.childNodes[1]);
                    wrapper.childNodes[0].style.display = 'block';

                    //дурацкая проверка
                    if (moment <= that.todayDate) {
                        that.renderTasks((that.user.tasks[that.user.tasks.length - 1]), 1);
                    } else if (moment > that.todayDate &&
                        moment < (setData(0, 0 + 1, 0))) {
                        that.renderTasks((that.user.tasks[that.user.tasks.length - 1]), 2);
                    } else if (moment > (setData(0, 0 + 1, 0))) {
                        that.renderTasks((that.user.tasks[that.user.tasks.length - 1]), 3);
                    }


                    // that.checkDate(); 
                    //закомичено так как эта функция рендерит все задачи в массиве заново
                    //а предыдущий метод только последнюю
                    inputConst.value = ''; //отчистка введеного поля
                }
            })
        })
    };

    TaskManager.prototype.renderTasks = function (value, num) {
        var main = document.getElementsByClassName('main');
        var parent;
        var div = document.createElement('div');
        var dateTask = document.createElement('div');
        var dateTaskIcon = document.createElement('i');


        if (num === 1) {
            parent = document.getElementsByClassName('today');
        } else if (num === 2) {
            parent = document.getElementsByClassName('upcoming');
        } else if (num === 3) {
            parent = document.getElementsByClassName('future');
        } else if (num === undefined) {
            parent = document.getElementsByClassName('today'); ///доделать
        }



        for (var i = 0; i < main[0].childNodes.length; i++) {
            if (main[0].childNodes[i].className === 'oops') {
                if (this.user.tasks.length !== 0) {
                    var child = document.getElementsByClassName('oops');
                    main[0].removeChild(child[0]);
                    break;
                };
            };
        };

        div.setAttribute('class', 'task');
        div.innerHTML = value.task;

        dateTaskIcon.classList.add('fa', 'fa-bars');
        dateTaskIcon.setAttribute('aria-hidden', 'true');

        dateTask.classList.add('dateTask');

        if (this.todayDate.getDate() === value.date.getDate() &&
            this.todayDate.getMonth() === value.date.getMonth() &&
            this.todayDate.getFullYear() === value.date.getFullYear()) {
            dateTask.innerHTML = 'Today';
        } else if (((this.todayDate.getDate()) + 1) === value.date.getDate() &&
            this.todayDate.getMonth() === value.date.getMonth() &&
            this.todayDate.getFullYear() === value.date.getFullYear()) {
            dateTask.innerHTML = 'Tommorow';
        } else {
            dateTask.innerHTML = value.date.toDateString().substr(0, value.date.toDateString().length - 5);
        }

        dateTask.appendChild(dateTaskIcon);
        div.appendChild(dateTask);
        parent[0].appendChild(div);
    };


    TaskManager.prototype.checkDate = function () {
        for (var i = 0; i < this.user.tasks.length; i++) {
            if (this.user.tasks[i].date <= this.todayDate) {
                this.renderTasks(this.user.tasks[i], 1);
            } else if (this.user.tasks[i].date > this.todayDate &&
                this.user.tasks[i].date < (setData(0, 0 + 1, 0))) {
                this.renderTasks(this.user.tasks[i], 2);
            } else if (this.user.tasks[i].date > (setData(0, 0 + 1, 0))) {
                this.renderTasks(this.user.tasks[i], 3);
            }
        }

    };





    function Calendar() {
        this.date = new Date();
        this.dateLastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        this.dayWeekLast = new Date(this.date.getFullYear(), this.date.getMonth(), this.dateLastDay).getDay();
        this.dayWeekFirst = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jule', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        this.week1 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    }


    Calendar.prototype.render = function () {
        var parent = document.querySelector('.calend');
        var dayweek = document.createElement('div');
        var calendar = document.createElement('div');
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



        for (var i = 0; i < this.week.length; i++) {
            var dayweek = document.createElement('div');
            dayweek.innerHTML = this.week[i];
            dayweek.classList.add('dayweek');
            calendar.appendChild(dayweek);

        }

        if (this.dayWeekFirst != 0) {
            for (var i = 1; i < this.dayWeekFirst; i++) {
                var div = document.createElement('div');
                div.classList.add('day');
                calendar.appendChild(div);

            }
        } else {
            for (var i = 0; i < 6; i++) {
                var div = document.createElement('div');
                div.classList.add('day');
                calendar.appendChild(div);
            }
        }

        for (var i = 1; i <= this.dateLastDay; i++) {
            // if (i != this.date.getDate()) {
            var div = document.createElement('div');
            div.setAttribute('id', i);
            div.classList.add('day');
            div.innerHTML = i;
            calendar.appendChild(div);
            // } else if (i === new Date().getDate() && this.date.getMonth() === new Date().getMonth() && this.date.getFullYear() === new Date().getFullYear()) {
            //     var div = document.createElement('div');
            //     div.classList.add('day');
            //     div.innerHTML = i;
            //     calendar.appendChild(div);

            // }
        }

        //to-do сделать так чтобы календарь не скакал


        this.clickality();

    };

    Calendar.prototype.clickality = function () {
        var date = this.date;
        var that = this;
        var parent = document.querySelector('.calend');
        var calendar = document.querySelector('.calendar');
        calendar.addEventListener('click', function (event) {
            if (event.target.id === 'last') {
                that.date = setData(date.getFullYear(), date.getMonth() - 1, date.getDate());
                that.dateLastDay = new Date(that.date.getFullYear(), that.date.getMonth() + 1, 0).getDate();
                that.dayWeekLast = new Date(that.date.getFullYear(), that.date.getMonth(), that.dateLastDay).getDay();
                that.dayWeekFirst = new Date(that.date.getFullYear(), that.date.getMonth(), 1).getDay();
                parent.removeChild(calendar);

                that.render();

            } else if (event.target.id === 'next') {
                that.date = setData(date.getFullYear(), date.getMonth() + 1, date.getDate());
                that.dateLastDay = new Date(that.date.getFullYear(), that.date.getMonth() + 1, 0).getDate();
                that.dayWeekLast = new Date(that.date.getFullYear(), that.date.getMonth(), that.dateLastDay).getDay();
                that.dayWeekFirst = new Date(that.date.getFullYear(), that.date.getMonth(), 1).getDay();
                parent.removeChild(calendar);

                that.render();

            }
        });
    };












    function test() {
        var test = new TaskManager('wrapper');
        // var user1 = new User('test');
        // var task11 = new GetTask('Buy some food for the weekend partry', setData(2017, 0, 2)),
        //     task12 = new GetTask('Discuss marketing strategy with John and Sarah', setData(2017, 0, 21)),
        //     task13 = new GetTask('Take a car from dealer', setData(2017, 0, 20)),
        //     task21 = new GetTask('Pick up kids from the dentist', setData(2017, 0, 22)),
        //     task22 = new GetTask('Show more ideas about Remmi app icon', setData(2017, 0, 30)),
        //     task23 = new GetTask('Jeff vacation', setData(2017, 0, 30)),
        //     task24 = new GetTask('Buy Christmas gifts', setData(2017, 0, 30)),
        //     task31 = new GetTask('Plan a trip to San Francisco', setData(2017, 0, 80)),
        //     task32 = new GetTask('Generate some fake content just for presentation and fun', setData(2017, 0, 120)),
        //     task33 = new GetTask('Project presentation', setData(2017, 0, 120)),
        //     task34 = new GetTask('Mom\'s birthday ', setData(2017, 0, 120));



        // user1.tasks.push(task11);
        // user1.tasks.push(task12);
        // user1.tasks.push(task13);

        // user1.tasks.push(task21);
        // user1.tasks.push(task22);
        // user1.tasks.push(task23);
        // user1.tasks.push(task24);
        // user1.tasks.push(task31);
        // user1.tasks.push(task32);
        // user1.tasks.push(task33);
        // user1.tasks.push(task34);



        var todayDateSet = setData(0, 0, 0, 23, 59);
        test.todayDate = todayDateSet;
        // test.userNames.push(user1);

        console.log(test.userNames);
        console.log(test);
        return test;
    }


    test().createStartPage(); //старт приложения, во многих методах есть вызов 
    //других сопутсвующих методов в нужный момент, поэтому вызывается только createStartPage

} (window));
