'use strict'



var express = require('express');
var app = express();




// Importar rutas
var userRoute = require('./routes/user');
var bookRoute = require('./routes/book');


// middleware del body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());



// Cabeceras y cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Headers");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});



// Rutas del body-parser
app.use('/', userRoute);
app.use('/', bookRoute);




module.exports = app;