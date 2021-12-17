import PredioModel from '../models/Predio.js';
import UserModel from '../models/User.js';
import RolModel from "../models/Rol.js";
const PredioController = {};

// CREAR Y GUARDAR PREDIO
PredioController.create = async (req, res) => {
    if (!req.body.area || !req.body.latitud || !req.body.longitud ){
        res.status(400).send({ message: "Hay contenido que no puede estar vacío!" });
        return;
    }

    const predio = new PredioModel({
        area: req.body.area,
        latitud: req.body.latitud,
        longitud: req.body.longitud
    });

    predio.save()
        .then(predio => {
            res.send({
                message:"Predio creado correctamente",
                predio:predio
                });
            })
        .catch(err => {
            res.status(500).send({ message: err || "Ocurrió un error al crear un predio" });
            });
    };

// TRAER TODOS LOS PREDIOS
PredioController.findAll = async (req, res) => {
    try {
        const predios = await PredioModel.find();
        res.status(200).json(predios);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// TRAER UN PREDIO CON UN ID
PredioController.findOne = async (req, res) => {
    try {
        const user = await PredioModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// ACTUALIZAR UN PREDIO POR ID
PredioController.update = async (req, res) => {
    if(!req.body.area && !req.body.latitud && !req.body.longitud && !req.body.usuarioGestor) {
        res.status(400).send({
            message: "Los datos a actualizar no deben estar vacíos!"
        });
        return;
    }

    const id = req.params.id;

    if (req.body.usuarioGestor) {
        const idUser = req.body.usuarioGestor;
        let idRol = -1;

        try {
            const user = await UserModel.findById(idUser);
            if(user) {
                req.body.usuarioGestor = user._id;
                RolModel.findOne({name: "manager"}, (err, rol) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }

                    user.roles = rol._id;
                    user.save((err, user) => {
                        if (err) {
                            res.status(500).send({message: err});
                        }
                    });
                });
            }
            else {
                res.status(404).json({message: "No se encontró el usuario"})
                return;
            }
        } catch(error) {
            res.status(404).json({ message: error.message});
            return;
        }

    }


    PredioModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }, (err, predio, resp) => {
        if(err) {
            res.status(500).send({
                message: err
            });
            return;
        }

        if (!predio) {
            res.status(404).send({
                message: `Predio no encontrado.`
            });
        }

    });

    res.send({message: "Predio Actualizado"});

};

PredioController.destroy = async (req, res) => {
    await PredioModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Predio no encontrado.`
            });
        } else {
            res.send({
                message: "Predio eliminado correctamente!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


export default PredioController;
