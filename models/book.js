'use strict'

//  MODELO PARA GUARDAR UN LIBRO

var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var BookSchema = Schema({
    name: {type: String, require: [true, 'El nombre es obligatorio']},
    quantity: {type: Number, require: [true, 'La cantidad es obligatoria']},
    description: {type: String, require: [true, 'El descricion es obligatoria']}    

});



module.exports = mongoose.model('Book', BookSchema);