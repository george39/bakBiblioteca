'use strict'

/**************************************************************************
RUTAS PARA LOS LIBROS
***************************************************************************/
var express = require('express');
var api = express.Router();
var bookController = require('../controllers/book');


api.post('/save-book', bookController.saveBook);
api.get('/get-books', bookController.getBooks);
api.get('/get-book/:id', bookController.getBook);
api.put('/update-book/:id', bookController.updateBook);
api.delete('/delete-book/:id', bookController.deleteBook);









module.exports = api;