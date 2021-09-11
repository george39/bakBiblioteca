'use strict'

//  MODELO PARA GUARDAR UN USUARIO

var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var UserSchema = Schema({
    name: {type: String, require: [true, 'El nombre es obligatorio']},
    surname: {type: String, require: [true, 'El el apellido es obligatorio']},
    document: {type: String, require: [true, 'El numero de documento es obligatorio']},
    phone: {type: String, require: [true, 'El telefono es obligatorio']},
    password: {type: String, reguire: [true, 'La contraseña es obligatoria']},
    role: {type: String, default: 'USER'},
    status: {type: String, default: ''},
    idLibro: {type: String, default: ''}

});



module.exports = mongoose.model('User', UserSchema);