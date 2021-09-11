'use strict' 


// CONTROLADOR PARA USUARIOS


var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');



function saveUser(req, res) {
    

    var params = req.body;
    var phone = params.phone;
    var password = params.password;
    var user = new User();



    if (params.name) {

        // asignar valores
        user.name = params.name;
        user.surname = params.surname;
        user.document = params.document;
        user.phone = params.phone;


        User.findOne({document: user.document.toLowerCase()}, (err, issetUser) => {
            if (err) {
                res.status(500).json({
                    message: 'Error al obtener usuario'
                });
            } else {
                if (!issetUser) {
                    // cifrar contraseña 
                    bcrypt.hash(password, null, null, (err, hash) => {
                        if (hash) {
                            user.password = hash;
                            user.save((err, userStored) => {
                                if (err) {
                                    res.status(500).json({
                                        message: 'Error al guardar usuario'
                                    });
                                } else {
                                    res.status(200).json({
                                        user: userStored
                                    });
                                }
                            });
                        } else {
                            res.status(404).json({
                                message: 'No se ha podido guardar el usuario'
                            });
                        }
                    });
                } else {
                    res.status(400).json({
                        message: 'El usuario con ese numero de identificacion ya existe'
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




function login(req, res) {
    

    var params = req.body;
    var password = params.password;
    var document = params.document;


    User.findOne({document: document.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500).json({
                message: 'Error al obtener usuario'
            });
        } else {
            if (user) {
                // comparar contraseña
                bcrypt.compare(password, user.password, (err, chek) => {
                   if (err) {
                       res.status(500).json({
                           message: 'Error al obtener usuario'
                       });
                   } else {
                       if (chek) {
                            if (params.gettoken) {
                                res.status(200).json({
                                    token: jwt.createToken(user)
                                });
                            } else {
                                res.status(200).json({
                                    user
                                });
                            }
                       } else {
                           res.status(404).json({
                               message: 'No se ha podido obtener el usuario'
                           });
                       }
                   }
                });
                
            } else {
                res.status(404).json({
                    message: 'El usuario no existe'
                });
            }
        }
    });
    
}


/************************************************************
 LISTAR UN USUARIO ESPECIFICO
*************************************************************/
function getUser(req, res) {

    let userId = req.params.id;

    User.findById(userId).populate().exec((err, user) => {

        if (err) {
            return res.status(500).json({
                message: 'Error al obtener libro'
            });
        } else {
            if (!user) {
                return res.status(404).json({
                    message: 'El libro no existe'
                });
            } else {
                return res.status(200).json({
                    user
                });
            }
        }

    });
}



function getUsers(req, res) {

    var params = req.body;

    User.find((err, user) => {
        if (err) {
            res.status(500).json({
                message: 'Error al obtener el usuario'
            });
        } else {
            if (!user) {
                res.status(400).json({
                    message: 'No hay usuarios'
                });
            } else {
                res.status(200).json({
                    user: user
                });
            }
        }
    });
    
}



function updateUser(req, res) {
    var update = req.body;
    var userId = req.params.id;


    User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdate) => {
        if (err) {
            res.status(500).json({
                message: 'Error al actualizar usuario'
            });
        } else {
            if (!userUpdate) {
                res.status(400).json({
                    message: 'El usuario no existe'
                });
            } else {
                res.status(200).json({
                    user: userUpdate
                });
            }
        }
    });
}




// function deleteUser(req, res) {
//     var userId = req.params.id;

//     User.findByIdAndDelete(userId, (err, userDelet) => {
//         if (err) {
//             res.status(500).json({
//                 message: 'Error al borrar usuario'
//             });
//         } else {
//             if (!userDelet){
//                 res.status(400).json({
//                     message: 'El usuario no existe'
//                 });
//             } else {
//                 res.status(200).json({
//                     user: userDelet
//                 });
//             }
//         }
//     });
// }




module.exports = {
    saveUser,
    login, 
    updateUser,
    getUser,
    getUsers
    // deleteUser
}