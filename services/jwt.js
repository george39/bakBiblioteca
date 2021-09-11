'use strict'



var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave-secreta-de-la-appi-de-biblioteca';





exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        document: user.document,
        phone: user.phone,
        password: user.password,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(60, 'days').unix(),
    }
    return jwt.encode(payload, secret);
};