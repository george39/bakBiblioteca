'use strict'

// CONEXIÓN CON LA BASE DE DATOS Y SERVIDOR


var mongoose = require('mongoose');
var app = require('./app');




mongoose.connect('mongodb://localhost:27017/biblioteca', (err, resp) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos corriendo');
    }
});


app.listen(3000, () => {
    console.log('servidor correindo en el puerto 3000');
});