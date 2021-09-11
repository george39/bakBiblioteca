'use strict'

/**************************************************************************
RUTAS PARA LOS USUARIOS
***************************************************************************/

var express = require('express');
var api = express.Router();
var userController = require('../controllers/user');


api.post('/save-user', userController.saveUser);
api.post('/login', userController.login);
api.put('/update-user/:id', userController.updateUser);
api.get('/get-user/:id', userController.getUser);
api.get('/get-users', userController.getUsers);









module.exports = api;



