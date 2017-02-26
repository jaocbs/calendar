(function (global) {

    var input,
        user_;

    function User(name) {
        this.name = name;
        this.tasks = [];

    }

    function GetTask(task) {
        this.task = task;
        this.date;
        this.subtask;
    }

    var date_user_1_1 = new Date();
    console.log(date_user_1_1);
    var user_1_tasks = new GetTask('Buy TV');
    console.log(user_1_tasks);


    var user_1 = new User('Ruslan');
    user_1.tasks.push(new GetTask('Buy TV'));


    var userNames = [];
    var logIn;

    userNames.push(user_1);
    console.log(userNames);








    //end create




    function createStartPage() {
        // global elem
        var wrapper = document.getElementById('wrapper'),
            header = document.createElement('header'),
            content = document.createElement('div'),
            footer = document.createElement('footer'),
            nameApp = document.createElement('div'),
            p = document.createElement('p'),
            form = document.createElement('form'),
            label = document.createElement('label'),

            btn = document.createElement('button');
        input = document.createElement('input');

        header.classList.add('col-12');
        content.classList.add('col-12', 'content');
        footer.classList.add('col-12');
        nameApp.classList.add('nameApp', 'col-12');

        p.appendChild(document.createTextNode('remmi'));

        wrapper.appendChild(header);
        wrapper.appendChild(content);
        wrapper.appendChild(footer)
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


        btn.onclick = function () {
            var userName = input.value;
            for (var i = 0; i < userNames.length; i++) {
                if (userName === userNames[i].name) {
                    wrapper.removeChild(content);
                    wrapper.removeChild(header);
                    wrapper.removeChild(footer);
                    createInnerPage();
                    break;
                } else {
                    user_ = new User(input.value);
                    userNames.push(user_);
                    console.log(userNames);
                    wrapper.removeChild(content);
                    wrapper.removeChild(header);
                    wrapper.removeChild(footer);
                    createInnerPage();
                    break;
                }
            }
        };



    }




    // var links, updatestate, contentEl, navEl;

    // contentEl = document.getElementById('wrapper');
    // navEl = document.querySelector('.btn');

    // links = {
    //     main: 'Page not found',
    // };

    // updatestate = function (state) {
    //     if (!state) return;
    //     contentEl.innerHTML = links[state.page];
    // };
    // window.addEventListener('popstate', function (e) {
    //     updatestate(e.state);
    // })

    // navEl.addEventListener('click', function (e) {
    //     var state;
    //     if (e.target.tagName !== 'A') return;
    //     state = { page: e.target.getAttribute('href') };
    //     history.pushState(state, '', state.page);
    //     updatestate(state);
    //     e.preventDefault();
    // });


    function createInnerPage() {
        var wrapper = document.getElementById('wrapper'),
            header = document.createElement('header'),
            divheadrow = document.createElement('div'),
            content = document.createElement('div'),
            footer = document.createElement('footer'),
            oops = document.createElement('p');


        // divheadrow.classList.add('row');
        header.classList.add('col-12');
        content.classList.add('col-12', 'main');
        footer.classList.add('col-12');

        wrapper.appendChild(header);
        wrapper.appendChild(content);
        wrapper.appendChild(footer);

        var today = document.createElement('a'),
            upcoming = document.createElement('a'),
            future = document.createElement('a');

        today.classList.add('col-4', 'headerlinks');
        upcoming.classList.add('col-4', 'headerlinks');
        future.classList.add('col-4', 'headerlinks');

        today.setAttribute('href', '#');
        upcoming.setAttribute('href', '#');
        future.setAttribute('href', '#');

        header.appendChild(divheadrow);
        divheadrow.appendChild(today);
        divheadrow.appendChild(upcoming);
        divheadrow.appendChild(future);

        today.appendChild(document.createTextNode('today'));
        upcoming.appendChild(document.createTextNode('upcoming'));
        future.appendChild(document.createTextNode('future'));

        var inputTask = document.createElement('input');
        var voice = document.createElement('i');
        var option = document.createElement('div');
        var optionP = document.createElement('p');
        var optionUl = document.createElement('ul');
        var optionLi = document.createElement('li');


        footer.appendChild(inputTask);
        footer.appendChild(voice);
        footer.appendChild(option);
        option.appendChild(optionP);
        optionP.appendChild(document.createTextNode('...'));
        optionP.appendChild(optionUl);

        voice.classList.add('fa', 'fa-microphone');
        voice.setAttribute('aria-hidden', 'true');

        inputTask.classList.add('inputTask', 'col-6');
        inputTask.setAttribute('placeholder', 'Enter your task');
        voice.classList.add('footerVoice', 'col-2');
        option.classList.add('option', 'col-2');

        var userName = input.value;

        for (var i = 0; i < userNames.length; i++) {
            if (userNames[i].name === userName) {
                if (userNames[i].tasks.length === 0) {
                    oops.classList.add('oops');
                    oops.appendChild(document.createTextNode('Oww! No task for today!'));
                    content.appendChild(oops);
                    break;
                } else {
                    console.log('доделай cтроку кода');
                }
            }
        }




        voice.onclick = function () {
            var newTask = inputTask.value;
            content.removeChild(oops);
            var createTask = document.createElement('div');
            createTask.classList.add('col-12', 'task');
            createTask.appendChild(document.createTextNode(newTask));
            content.appendChild(createTask);
            console.log(userNames);
            user_.tasks.push(new GetTask(newTask));
            console.log(userNames);
            console.log(user_.tasks);
            createTask.onclick = function () {
                console.log('12');
            }
        };




        // function createSelections() {
        //     var arrNameSelect = ['Setting', 'Dark mode', 'Buy full version', 'Rate us', 'Sign Out'];
        //     var arrLinks = ['#Setting', '#Darkmode', '#Buy', '#Rate', '#Sign'];

        //     var liCreate;//create LI
        //     var liLinks; // create links
        //     for (var i = 0; i < 5; i++) {
        //         liCreate = document.createElement('li');
        //         liLinks = document.createElement('a');
        //         liLinks.setAttribute('href', arrLinks[i]);
        //         liCreate.appendChild(liLinks);
        //         liLinks.appendChild(document.createTextNode(arrNameSelect[i]));
        //         optionUl.appendChild(liCreate);
        //     }
        // }
        // createSelections();
    }

    // createInnerPage();

    createStartPage();



    // console.log(userNames.length);


} (window));