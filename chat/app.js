var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');
var crypto = require('crypto');
var mysql = require('mysql');

var app = require('express')();
var http = require('http').Server(app);
var  io  =  require('socket.io')(http);


var index = require('./routes/index');
var users = require('./routes/users');




var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'my_db'
});
connection.connect();

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
app.use('/', routes);

app.get('/', function (req, res) {

})

// app.post('/', function (req, res) {

// res.redirect('/');

// console.log('got a POST request');
// console.log(req.body.subject);
// console.log(req.body.startDate);
// console.log(req.body.endDate); 
// console.log(req.body.Prepod); 

// var postData = {
//     subject: req.body.subject,
//     startDate: req.body.startDate,
//     endDate: req.body.endDate,
//     Prepod: req.body.Prepod
// }



// // connection.query('INSERT INTO users SET ?', 
// // postUser, 
// // function(error, results, fields) {
// //         if (error) throw error;
// //         console.log('The solution is: ', results.insertId);

// //         connection.query('INSERT INTO users_grp VALUES (?,  ?)', 
// //         [1, results.insertId], 
// //         function (error, results, fields) {
// //                 if (error) throw error; 
// //                 console.log('The usergroup is: ', results.insertId);
// //             });
// // });

// function getUser (connect, id_user) {
//     return new Promise(function (resolve, reject) {
//         connect.query('INSERT INTO calendar SET ?', postData, function(err, rows, fields) {       
//                 if (rows.length == 0) reject();
//         resolve(rows);
//         console.log(resolve(rows));
//         })
//     })
// };

// getUser(connection);




// });

io.on('connection', function (socket) {
      socket.emit('news', {  hello: 'world' });
      socket.on('add', function (data) {
            console.log(data);
      });
    socket.on('newEvent', function (data) {

        console.log(data);
        function setEvent(connection, result) {
            return new Promise(function (resolve, reject) {
                connection.query('INSERT INTO calendar SET ?', data, function (err, rows, fields) {
                    if (rows.length === 0) reject();
                    resolve(rows);
                });
            });
        };

        setEvent(connection, data).then(function (result) {
            socket.emit('newEventToDB', result);
            return data;
        }).then(function (result) {
            io.emit('notificationAllUsers', result);
        }).then(function (result) {
            return new Promise(function (resolve, reject) {
                connection.query('SELECT * FROM calendar',
                    function (err, rows, fields) {
                        if (rows.length === 0) reject();
                        resolve(rows);
                    });
            });
        }).then(function (result) {
            io.emit('notificationAllUsersDATA', result);
        }).catch(function (err) {
            console.log('Promise rejected ' + err);
        });
    });

});


http.listen(3000, function () {
    console.log('listening on *:3000');
});




// var port = process.env.PORT || 3000;

// app.listen(port);
// console.log('Listening on port ' + port);

// module.exports = app;
