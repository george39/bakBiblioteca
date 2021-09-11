'use strict'


var Book = require('../models/book');








/***********************************************************************
CREAR UN LIBRO
************************************************************************/
function saveBook(req, res) {

    var book = new Book()
    var params = req.body;

    if (params.name) {
        book.name = params.name;
        book.quantity = params.quantity;
        book.description = params.description;
        
        



        book.save((err, bookSave) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al crear book'
                });
            } else {
                if (!bookSave) {
                    res.status(404).send({
                        message: 'No se ha podido crear book'
                    });
                } else {
                    res.status(200).send({
                        book: bookSave
                    });
                }
            }
        });
    } else {
        res.status(500).json({
            message: 'Introduce todos los datos'
        });
    }

}



/***********************************************************************
LISTAT TODOS LOS PORODUCTOS
************************************************************************/
function getBooks(req, res) {

    Book.find((err, book) => {
        if (err) {

            res.status(500).send({
                message: 'Error al cargar libros'
            });
        } else {
            if (!book) {
                res.status(404).send({
                    message: 'No existen libros'
                });
            } else {
                res.status(200).send({
                    book
                });

            }
        }
    });
}



/************************************************************
 LISTAR UN LIBRO ESPECIFICO
*************************************************************/
function getBook(req, res) {

    let bookId = req.params.id;

    Book.findById(bookId).populate().exec((err, book) => {

        if (err) {
            return res.status(500).json({
                message: 'Error al obtener libro'
            });
        } else {
            if (!book) {
                return res.status(404).json({
                    message: 'El libro no existe'
                });
            } else {
                return res.status(200).json({
                    book
                });
            }
        }

    });
}



/***********************************************************************
ACTUALIZAR UN LIBRO
************************************************************************/
function updateBook(req, res) {

    var bookId = req.params.id;

    var update = req.body;


    Book.findByIdAndUpdate(bookId, update, { new: true }, (err, bookUpdate) => {
        if (err) {

            res.status(500).send({
                message: 'Error al actualizar libro'
            });
        } else {
            if (!bookUpdate) {
                res.status(404).send({
                    message: 'El libro con ese id no existe'
                });
            } else {
                res.status(200).send({
                    book: bookUpdate

                });
            }
        }
    });
}











/***********************************************************************
ELIMINAR UN LIBRO
************************************************************************/
function deleteBook(req, res) {

    var bookId = req.params.id;


    Book.findByIdAndRemove(bookId, (err, bookDeleted) => {
        if (err) {

            res.status(500).send({
                message: 'Error al eliminar libro'
            });
        } else {
            if (!bookDeleted) {
                res.status(404).send({
                    message: 'El libro con ese id no existe'
                });
            } else {

                res.status(200).send({
                    book: bookDeleted
                });
            }

        }
    });
}











module.exports = {
    saveBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
    

};