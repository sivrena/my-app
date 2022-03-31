const fs = require('fs');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;

/*const mysql = require('mysql2');
//БД
const DB_HOST = "";
const DB_USER = "";
const DB_NAME = "";
const DB_PASSWORD = "";*/

const app = express(); 
const jsonParser = express.json();

//статика
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//обслуживание html
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//получение пользовательского теста
app.post("/person-test", jsonParser, function(request, response) {
    console.log(request.body);
    if (!request.body) { 
        return response.sendStatus(400);
    }

    let short_name = request.body.short_name;
    let full_name = request.body.full_name;
    let options = request.body.options;
    let decoration = request.body.decoration;
    let questions = request.body.questions;

    console.log(short_name);
    console.log(full_name);
    console.log(options);
    console.log(decoration);
    console.log(questions);

    response.end('It worked!');
});


app.listen(port);