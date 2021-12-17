import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';
import RolModel from "../models/Rol.js";
const UserController = {}

// CREAR Y GUARDAR UN USUARIO
UserController.create = async (req, res) => {
    // Validar campos vacíos
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.roles) {
        res.status(400).send({ message: "Hay contenido que no puede estar vacío!" });
    }

    // crear instancia de usuario
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        status: true,
    });

    //guardar y ...
    user.save((err, user) => {

        if (err) {
            console.log(err.name)
            res.status(500).send({ message: err.message });
            return;
        }

        // Asignar Rol
        if (req.body.roles) {
            RolModel.findOne({name: req.body.roles}, (err, rol) => {
                if (err) {
                    res.status(500).send({message: err});
                }
                user.roles = rol._id;

                // Guardar y enviar
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({
                        message: "Usuario creado correctamente",
                        user: user
                    });
                });
            });

        }
    });
};

// TRAER TODOS LOS USUARIOS
UserController.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// TRAER UN USUARIO CON UN ID
UserController.findOne = async (req, res) => {

    if(!req.params.id){
        res.status(400).send({ message: "Los datos de busqueda no pueden estar vacios"})
    }

    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        if(user)
            res.status(200).json(user);
        else
            res.status(404).json({message: "No se encontró el usuario"})
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// ACTUALIZAR UN USUARIO POR ID
UserController.update = async (req, res) => {

    if(!req.body) {
        res.status(400).send({
            message: "Los datos a actualizar no deben estar vacíos!"
        });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Usuario no encontrado.`
            });
        }else{
            res.send({ message: "Usuario actualizado correctamente." });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// PSEUDO ELIMINATION DE UN USUARIO POR ID
UserController.destroy = async (req, res) => {

    if(!req.params.id) {
        res.status(400).send({
            message: "El ID del usuario a eliminar no debe estar vacío!"
        });
    }

    const ID = req.params.id;

    await UserModel.findByIdAndUpdate(ID, {status: false}, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Usuario no encontrado.`
            });
        }else{
            res.send({ message: "Usuario eliminado correctamente." });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

export default UserController;
